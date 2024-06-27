import { CountryTrack, TopTrack } from '../models/track.js';
import fetchData from './spotifyService.js';


const saveData = async (data) => {
  try {
    for (const country in data) {
      const countryData = data[country];

      await CountryTrack.updateOne(
        { country },
        { $set: { data: countryData } },
        { upsert: true }
      );
    }

    console.log('All tracks saved successfully');

    await generateNewTop50();
    console.log('New top 50 generated successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

const generateNewTop50 = async () => {
  try {
    const allTracks = await CountryTrack.find();
    const trackMap = new Map();

    allTracks.forEach((countryTrack) => {
      const { tracks } = countryTrack.data;

      if (tracks && tracks.items) {
        tracks.items.forEach(({ added_at, added_by, is_local, primary_color, track, video_thumbnail }) => {
          // Ensure uniqueness based on track ID
          if (!trackMap.has(track.id)) {
            trackMap.set(track.id, {
              added_at,
              added_by,
              is_local,
              primary_color,
              'track': {...track},
              video_thumbnail,
              count: 0
            });
          }
          trackMap.get(track.id).count++;
        });
      }
    });

    const uniqueTracks = Array.from(trackMap.values());

    // Sort tracks based on popularity and other criteria as needed
    uniqueTracks.sort((a, b) => b.popularity - a.popularity || b.count - a.count);

    const top50Tracks = uniqueTracks.slice(0, 50);

    await TopTrack.updateOne(
      { country: 'top50' },
      { $set: { tracks: top50Tracks } },
      { upsert: true }
    );

    return top50Tracks;
  } catch (error) {
    console.error('Error generating new top 50:', error);
    throw error;
  }
};

const initializeData = async () => {
  try {
    const data = await fetchData();
    await saveData(data);
    console.log('Data fetched and saved');
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error;
  }
};

export { saveData, generateNewTop50, initializeData };