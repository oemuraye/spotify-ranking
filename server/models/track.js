import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  country: String,
  tracks: Array,
});

const Track = mongoose.model('Track', trackSchema);

export default Track;