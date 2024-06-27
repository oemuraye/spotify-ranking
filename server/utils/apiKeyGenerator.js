import crypto from 'crypto';

import ApiKey from '../models/apiKey.js';

const generateApiKey = () => {
  return crypto.randomBytes(15).toString('hex');
};

// Function to generate and save an API key
const createAndSaveApiKey = async () => {
    try {
      const key = generateApiKey();
      const apiKey = new ApiKey({ key });
      await apiKey.save();
      return key;
    } catch (error) {
      console.error('Error generating API key:', error);
      throw new Error('Error generating API key');
    }
  };
  
  export { generateApiKey, createAndSaveApiKey };