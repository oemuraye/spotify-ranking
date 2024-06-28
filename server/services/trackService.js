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

    await generateNewTopRanking();
    console.log('New top ranking generated successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

const generateNewTopRanking = async () => {
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

    // Sort tracks based on popularity and count to get the top 50
    uniqueTracks.sort((a, b) => b.track.popularity - a.track.popularity || b.count - a.count);
    const top50Tracks = uniqueTracks.slice(0, 50);

    // Sort all tracks alphabetically by track name
    const allTracksSorted = uniqueTracks.sort((a, b) => a.track.name.localeCompare(b.track.name));

    await TopTrack.updateOne(
      { country: 'top50' },
      { $set: { tracks: top50Tracks } },
      { upsert: true }
    );

    await TopTrack.updateOne(
      { country: 'allTracks' },
      { $set: { tracks: allTracksSorted } },
      { upsert: true }
    );

    return { top50Tracks, allTracksSorted };
  } catch (error) {
    console.error('Error generating new top ranking:', error);
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

export { saveData, generateNewTopRanking, initializeData };