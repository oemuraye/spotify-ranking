import mongoose from 'mongoose';

// Schema for storing country data
const countryTrackSchema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
});

// Schema for storing top 50 tracks
const topTrackSchema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  tracks: { type: [mongoose.Schema.Types.Mixed], required: true }
});

const CountryTrack = mongoose.model('CountryTrack', countryTrackSchema);
const TopTrack = mongoose.model('TopTrack', topTrackSchema);

export { CountryTrack, TopTrack };