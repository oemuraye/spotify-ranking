import ApiKey from '../models/apiKey.js';

export const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing' });
  }

  const validApiKey = await ApiKey.findOne({ key: apiKey });

  if (!validApiKey) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  next();
};
