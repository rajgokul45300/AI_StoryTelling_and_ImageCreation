const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const path = require('path'); // Added missing import for path

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('client/build'));

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Story generation endpoint
app.post('/api/generate-story', async (req, res) => {
  try {
    const { genre, characters, paragraphs, characterNames } = req.body;
    
    if (!genre || !characters || !paragraphs) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create character context
    let characterContext = '';
    if (characterNames && characterNames.length > 0) {
      characterContext = `The main characters are: ${characterNames.join(', ')}. `;
    } else {
      characterContext = `The story should have ${characters} main characters. `;
    }

    // Craft the prompt for story generation
    const storyPrompt = `Write a creative and engaging ${genre} story with the following requirements:
${characterContext}
The story should be exactly ${paragraphs} paragraphs long.
Each paragraph should be rich in detail and advance the plot.
Make the story engaging, with vivid descriptions and emotional depth.
Ensure each paragraph flows naturally into the next.
The story should have a clear beginning, middle, and end.`;

    // Generate story using Gemini
    const storyResponse = await axios.post(
      `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: storyPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2000,
          topP: 0.9
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedStory = storyResponse.data.candidates[0].content.parts[0].text;
    
    // Split story into paragraphs
    const storyParagraphs = generatedStory
      .split('\n\n')
      .filter(para => para.trim().length > 0)
      .slice(0, parseInt(paragraphs));

    // Generate summary/preface
    const summaryPrompt = `Write a brief, engaging summary (2-3 sentences) for this ${genre} story that introduces the main characters and sets the tone without revealing major plot points.`;

    const summaryResponse = await axios.post(
      `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: summaryPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
          topP: 0.9
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = summaryResponse.data.candidates[0].content.parts[0].text;

    // Generate image prompts for each paragraph
    const imagePrompts = storyParagraphs.map((paragraph, index) => {
      // Create optimized prompts for image generation
      const sceneDescription = paragraph.substring(0, 300);
      const imagePrompt = `A cinematic scene from a ${genre} story: ${sceneDescription}. Beautiful lighting, detailed characters, atmospheric setting, high quality illustration.`;
      return {
        paragraphIndex: index,
        prompt: imagePrompt,
        content: paragraph
      };
    });

    res.json({
      success: true,
      story: {
        summary: summary,
        paragraphs: storyParagraphs,
        imagePrompts: imagePrompts,
        metadata: {
          genre,
          characters,
          paragraphs: storyParagraphs.length,
          characterNames: characterNames || []
        }
      }
    });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ 
      error: 'Failed to generate story',
      details: error.message 
    });
  }
});

// Generate images for paragraphs using Stability AI
app.post('/api/generate-images', async (req, res) => {
  try {
    const { imagePrompts } = req.body;
    
    if (!imagePrompts || !Array.isArray(imagePrompts)) {
      return res.status(400).json({ error: 'Invalid image prompts' });
    }

    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    
    if (!STABILITY_API_KEY) {
      return res.status(400).json({ error: 'Stability AI API key not configured' });
    }

    console.log(`🎨 Generating ${imagePrompts.length} images with Stability AI...`);

    // Generate images for each paragraph
    const imagePromises = imagePrompts.map(async (prompt, index) => {
      try {
        // Create a more detailed prompt for better image generation
        const enhancedPrompt = `Create a beautiful, detailed illustration for a story: ${prompt.prompt}. Style: cinematic, high quality, detailed, artistic, storybook illustration.`;
        
        const response = await axios.post(
          'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
          {
            text_prompts: [
              {
                text: enhancedPrompt,
                weight: 1
              }
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            samples: 1,
            steps: 30,
            style_preset: "cinematic"
          },
          {
            headers: {
              'Authorization': `Bearer ${STABILITY_API_KEY}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (response.data && response.data.artifacts && response.data.artifacts[0]) {
          // Convert base64 to data URL
          const imageData = response.data.artifacts[0];
          const imageUrl = `data:image/png;base64,${imageData.base64}`;
          
          return {
            paragraphIndex: prompt.paragraphIndex,
            imageUrl: imageUrl,
            prompt: prompt.prompt,
            altText: `AI-generated image for paragraph ${index + 1}`,
            seed: imageData.seed
          };
        } else {
          throw new Error('Invalid response from Stability AI');
        }
      } catch (error) {
        console.error(`Error generating image for paragraph ${index}:`, error.message);
        // Return a fallback placeholder if image generation fails
        return {
          paragraphIndex: prompt.paragraphIndex,
          imageUrl: `https://picsum.photos/800/600?random=${index}&blur=2`,
          prompt: prompt.prompt,
          altText: `Fallback image for paragraph ${index + 1}`,
          error: error.message
        };
      }
    });

    // Wait for all images to be generated
    const generatedImages = await Promise.all(imagePromises);
    
    console.log(`✅ Successfully generated ${generatedImages.length} images`);

    res.json({
      success: true,
      images: generatedImages
    });

  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({ 
      error: 'Failed to generate images',
      details: error.message 
    });
  }
});

// Edit story endpoint
app.post('/api/edit-story', async (req, res) => {
  try {
    const { originalStory, editInstructions, paragraphIndex } = req.body;
    
    if (!originalStory || !editInstructions) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const editPrompt = `Original story paragraph: "${originalStory}"
Edit instructions: ${editInstructions}
Please rewrite this paragraph following the edit instructions while maintaining the story's flow and style.`;

    const editResponse = await axios.post(
      `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: editPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.9
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const editedParagraph = editResponse.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      editedParagraph: editedParagraph.trim(),
      paragraphIndex: paragraphIndex
    });

  } catch (error) {
    console.error('Error editing story:', error);
    res.status(500).json({ 
      error: 'Failed to edit story',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes (only in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // In development, just send a message for non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.json({ 
        message: 'Frontend is running on http://localhost:3000',
        note: 'In development mode, the React app runs separately'
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Gemini API configured: ${GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Stability AI configured: ${process.env.STABILITY_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Using Google Gemini 1.5 Flash for AI storytelling! 🤖✨`);
  console.log(`Using Stability AI for real-time image generation! 🎨✨`);
});
