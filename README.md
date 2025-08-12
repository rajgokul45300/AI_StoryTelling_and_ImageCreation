# AI StoryTeller - LLM-Powered Story Generation App

A modern, AI-powered storytelling application that leverages Google's Gemini Pro model to create personalized stories based on user inputs. Built with React, Node.js, and Express.

## ✨ Features

- **AI Story Generation**: Create unique stories using Google's Gemini 1.5 Flash model
- **Genre Selection**: Choose from Fantasy, Mystery, Sci-Fi, Romance, or Adventure
- **Character Customization**: Specify character count or add custom character names
- **Story Length Control**: Set the number of paragraphs (2-10)
- **Real-Time Image Generation**: Generate high-quality images for each paragraph using Stability AI
- **Story Editing**: Edit individual paragraphs with AI assistance
- **Summary/Preface**: Get an engaging story summary automatically generated
- **Download & Share**: Export stories as text files or share via native sharing
- **Beautiful UI**: Modern, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ai_StoryTelling
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Start backend
   npm run dev
   
   # Terminal 2: Start frontend
   npm run client
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and sign in with your Google account
2. Create a new API key
3. Copy the API key and add it to your `.env` file
4. The free tier includes 15 requests per minute and 1500 requests per day

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Required |
| `STABILITY_API_KEY` | Your Stability AI API key for image generation | Optional |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Server**: Express.js with CORS and middleware
- **AI Integration**: Google Gemini 1.5 Flash API for story generation
- **Endpoints**:
  - `POST /api/generate-story` - Generate complete story
  - `POST /api/generate-images` - Generate images for paragraphs
  - `POST /api/edit-story` - Edit story paragraphs
  - `GET /api/health` - Health check

### Frontend (React)
- **Framework**: React 18 with functional components
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks for local state

### Key Components
- `StoryForm`: User input form for story parameters
- `StoryDisplay`: Story presentation with editing capabilities
- `Header`: Navigation and branding
- `LoadingSpinner`: Animated loading states

## 🎨 Customization

### Adding New Genres

1. Update the `genres` array in `StoryForm.js`
2. Add corresponding colors in `tailwind.config.js`
3. Update genre-specific styling in components

### Modifying Story Prompts

Edit the prompt templates in `server.js`:
- `storyPrompt`: Main story generation prompt
- `summaryPrompt`: Summary generation prompt
- `editPrompt`: Story editing prompt

### Image Generation

The application now includes **real-time AI image generation** using Stability AI:

1. **High-Quality Images**: 1024x1024 resolution with cinematic style
2. **Story-Specific Prompts**: Each paragraph gets a custom image based on content
3. **Real-Time Generation**: Images are generated on-demand for each story
4. **Fallback Handling**: Graceful fallback to placeholder images if generation fails
5. **Performance Optimized**: Parallel image generation for faster results

**Features:**
- Uses Stable Diffusion XL 1.0 model
- Cinematic style preset for storybook quality
- Optimized prompts for better image relevance
- Seed tracking for reproducible results

## 📱 Usage

### Creating a Story

1. **Select Genre**: Choose from available story types
2. **Set Characters**: Specify character count or add custom names
3. **Choose Length**: Set the number of paragraphs
4. **Generate**: Click "Generate My Story" and wait for AI processing
5. **Review**: Read your story with generated images
6. **Edit**: Modify paragraphs using the edit interface
7. **Export**: Download as text file or share with others

### Story Editing

- Click the "Edit" button on any paragraph
- Describe your desired changes
- Click "Apply Edit" to regenerate with AI
- Cancel to keep the original version

## 🚀 Deployment

### Production Build

```bash
# Build the React app
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Ensure all required environment variables are set in your production environment.

### Deployment Platforms

- **Heroku**: Use the included `heroku-postbuild` script
- **Vercel**: Deploy the `client` folder as a static site
- **Railway**: Deploy the entire project
- **Docker**: Create a Dockerfile for containerized deployment

## 🔍 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify your Gemini API key is correct
   - Check that you haven't exceeded the free tier limits
   - Ensure the key is properly set in environment variables

2. **Story Generation Fails**
   - Check browser console for error messages
   - Verify backend server is running
   - Check network connectivity to Google Gemini API

3. **Images Not Loading**
   - Current implementation uses placeholder images
   - Check browser console for any errors
   - Verify image generation endpoint is working

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini** for providing the AI model
- **React** team for the amazing framework
- **Tailwind CSS** for the utility-first styling
- **Framer Motion** for smooth animations

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Verify your API key and configuration
4. Open an issue in the repository

---

**Happy Storytelling! 🎭✨**
