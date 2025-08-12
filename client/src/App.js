import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [currentStory, setCurrentStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStoryGenerated = (story) => {
    setCurrentStory(story);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setCurrentStory(null);
  };

  const resetStory = () => {
    setCurrentStory(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <LoadingSpinner />
            </motion.div>
          )}
          
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </motion.div>
          )}
          
          {!currentStory && !isLoading && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StoryForm 
                onStoryGenerated={handleStoryGenerated}
                onError={handleError}
                setIsLoading={setIsLoading}
              />
            </motion.div>
          )}
          
          {currentStory && !isLoading && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StoryDisplay 
                story={currentStory} 
                onReset={resetStory}
                onError={handleError}
                setIsLoading={setIsLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AI StoryTeller. Powered by Google Gemini AI.</p>
            <p className="mt-2 text-sm">Create magical stories with the power of artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
