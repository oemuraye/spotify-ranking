import Track from '../models/track.js';


const saveData = async (data) => {
  try {
    for (const country in data) {
      const tracks = data[country].map((song) => ({
        song
      }));

      await Track.updateOne(
        { country },
        { $set: { tracks } },
        { upsert: true }
      );
    }

    console.log('All tracks saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

const generateNewTop50 = async () => {
  const allTracks = await Track.find();
  const trackMap = new Map();
  // return allTracks

  allTracks.forEach((entry) => {
    entry.tracks.forEach((track) => {
      if (!trackMap.has(track.spotifyId)) {
        trackMap.set(track.spotifyId, { ...track, count: 0 });
      }
      trackMap.get(track.spotifyId).count++;
    });
  });

  const uniqueTracks = Array.from(trackMap.values());
  uniqueTracks.sort((a, b) => b.count - a.count);

  return uniqueTracks.slice(0, 50);
};

export { saveData, generateNewTop50 };