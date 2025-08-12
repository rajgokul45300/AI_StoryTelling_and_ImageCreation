import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <BookOpen className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-gray-800 font-display">
          Crafting Your Story
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Our AI is weaving words into a magical tale just for you. This may take a few moments...
        </p>
        
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-primary-600">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Powered by Google Gemini 1.5 Flash</span>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
