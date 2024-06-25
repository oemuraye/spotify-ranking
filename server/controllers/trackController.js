import Track from '../models/track.js';
import { generateNewTop50 } from '../services/trackService.js';

const getTopTracks = async (req, res) => {
  const country = req.params.country;
  const tracks = await Track.findOne({ country });

  if (!tracks) {
    return res.status(404).send('Country not found');
  }

  res.send(tracks.tracks);
};

const getNewTopTracks = async (req, res) => {
  const newTop50 = await generateNewTop50();
  res.send(newTop50);
};

export { getTopTracks, getNewTopTracks };