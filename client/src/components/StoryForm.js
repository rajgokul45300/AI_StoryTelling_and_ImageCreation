import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Users, FileText, Sparkles } from 'lucide-react';
import axios from 'axios';

const StoryForm = ({ onStoryGenerated, onError, setIsLoading }) => {
  const [formData, setFormData] = useState({
    genre: 'fantasy',
    characters: 2,
    paragraphs: 3,
    characterNames: [],
    useCharacterNames: false
  });

  const [characterName, setCharacterName] = useState('');

  const genres = [
    { id: 'fantasy', name: 'Fantasy', color: 'story-fantasy', icon: '🧙‍♂️' },
    { id: 'mystery', name: 'Mystery', color: 'story-mystery', icon: '🔍' },
    { id: 'scifi', name: 'Sci-Fi', color: 'story-scifi', icon: '🚀' },
    { id: 'romance', name: 'Romance', color: 'story-romance', icon: '💕' },
    { id: 'adventure', name: 'Adventure', color: 'story-adventure', icon: '🗺️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCharacterName = () => {
    if (characterName.trim() && formData.characterNames.length < formData.characters) {
      setFormData(prev => ({
        ...prev,
        characterNames: [...prev.characterNames, characterName.trim()]
      }));
      setCharacterName('');
    }
  };

  const removeCharacterName = (index) => {
    setFormData(prev => ({
      ...prev,
      characterNames: prev.characterNames.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/generate-story', {
        genre: formData.genre,
        characters: formData.characters,
        paragraphs: formData.paragraphs,
        characterNames: formData.useCharacterNames ? formData.characterNames : []
      });

      if (response.data.success) {
        onStoryGenerated(response.data.story);
      } else {
        onError('Failed to generate story. Please try again.');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      onError(error.response?.data?.error || 'Failed to generate story. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Wand2 className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">
          Create Your Magical Story
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Let AI craft a personalized story just for you. Choose your genre, characters, and watch the magic happen!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="story-card">
        {/* Genre Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Choose Your Story Genre
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <motion.button
                key={genre.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, genre: genre.id }))}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.genre === genre.id
                    ? `border-purple-600 bg-purple-600 text-white shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">{genre.icon}</div>
                <div className="font-medium">{genre.name}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Character Configuration */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            <Users className="inline w-5 h-5 mr-2" />
            Character Configuration
          </label>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Characters
              </label>
              <input
                type="number"
                name="characters"
                min="1"
                max="10"
                value={formData.characters}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={formData.useCharacterNames}
                  onChange={(e) => setFormData(prev => ({ ...prev, useCharacterNames: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Use specific character names?</span>
              </label>
              
              {formData.useCharacterNames && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      placeholder="Enter character name"
                      className="input-field flex-1"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={addCharacterName}
                      disabled={!characterName.trim() || formData.characterNames.length >= formData.characters}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.characterNames.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.characterNames.map((name, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {name}
                          <button
                            type="button"
                            onClick={() => removeCharacterName(index)}
                            className="ml-2 text-primary-600 hover:text-primary-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Story Length */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            <FileText className="inline w-5 h-5 mr-2" />
            Story Length
          </label>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Paragraphs
            </label>
            <input
              type="number"
              name="paragraphs"
              min="2"
              max="10"
              value={formData.paragraphs}
              onChange={handleInputChange}
              className="input-field"
            />
            <p className="text-sm text-gray-500 mt-1">
              Recommended: 3-5 paragraphs for a complete story
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn-primary w-full text-lg py-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="inline w-5 h-5 mr-2" />
          Generate My Story
        </motion.button>
      </form>
    </motion.div>
  );
};

export default StoryForm;
