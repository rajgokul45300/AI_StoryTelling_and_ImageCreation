# 🚀 Quick Setup Guide - AI StoryTeller

## ⚡ Get Started in 5 Minutes

### 1. **Get Your API Keys**
- **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
  - Sign in with your Google account
  - Create a new API key for AI story generation
- **Stability AI Key** (Optional): Visit [Stability AI](https://platform.stability.ai/)
  - Sign up and get API key for real-time image generation
  - Free tier available with credits

### 2. **Set Up Environment**
```bash
# Copy the environment template
cp env.example .env

# Edit .env and add your API key
DEEPINFRA_API_KEY=your_actual_api_key_here
```

### 3. **Install Dependencies**
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client && npm install && cd ..
```

### 4. **Start the Application**
```bash
# Use the startup script (recommended)
./start.sh

# OR start manually:
# Terminal 1: npm run dev
# Terminal 2: npm run client
```

### 5. **Open Your Browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 What You'll Get

✅ **Beautiful UI** - Modern, responsive design with animations  
✅ **AI Story Generation** - Using Google's Gemini 1.5 Flash model
✅ **Real-Time Images** - Using Stability AI for story-specific illustrations  
✅ **Genre Selection** - Fantasy, Mystery, Sci-Fi, Romance, Adventure  
✅ **Character Customization** - Set count or add custom names  
✅ **Story Editing** - AI-powered paragraph editing  
✅ **Real-Time Image Generation** - High-quality AI images using Stability AI  
✅ **Export Options** - Download stories as text files  
✅ **Mobile Responsive** - Works on all devices  

## 🔧 Troubleshooting

**"API Key Error"**
- Check your `.env` file has the correct key
- Verify the key hasn't exceeded free tier limits

**"Port Already in Use"**
- Change the port in `.env` file
- Or kill existing processes on ports 3000/5000

**"Dependencies Missing"**
- Run `npm install` in both root and client directories
- Clear `node_modules` and reinstall if needed

## 📱 Usage

1. **Choose Genre** - Pick your story type
2. **Set Characters** - Number or custom names
3. **Select Length** - 2-10 paragraphs
4. **Generate** - Click and wait for AI magic
5. **Read & Edit** - Enjoy your story and make changes
6. **Export** - Download or share your creation

## 🎨 Customization

- **Add Genres**: Edit `client/src/components/StoryForm.js`
- **Change Prompts**: Modify `server.js` story generation logic
- **Real Images**: Replace placeholder images with AI image generation APIs

---

**Need Help?** Check the full `README.md` for detailed documentation! 📚
