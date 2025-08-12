import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-yellow-800" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                AI StoryTeller
              </h1>
              <p className="text-sm text-gray-600 -mt-1">Powered by Google Gemini 1.5 Flash</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-6 text-sm text-gray-600"
          >
            <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
            <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
