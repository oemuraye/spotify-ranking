import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

export default ApiKey;
