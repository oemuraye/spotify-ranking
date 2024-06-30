import { CountryTrack, TopTrack } from '../models/track.js';
import { initializeData } from '../services/trackService.js';

// Function to get top tracks for a specific country
const getTopTracks = async (req, res) => {
  try {
    // initializeData();
    const country = req.params.country.toUpperCase();
    const countryData = await CountryTrack.findOne({ country });

    if (!countryData) {
      return res.status(404).send('Country not found');
    }

    res.status(200).json({ data: countryData.data });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ message: 'Server error'});
  }
};

// Function to get the newly generated top 50 tracks
const getNewTopTracks = async (req, res) => {
  try {
    // initializeData();
    const top50TracksData = await TopTrack.findOne({ country: 'top50' });

    if (!top50TracksData) {
      return res.status(404).json({ message: 'Top 50 tracks not found'});
    }

    res.status(200).json({ data: top50TracksData.tracks });
  } catch (error) {
    console.error('Error fetching new top 50 tracks:', error);
    res.status(500).json({ message: 'Server error'});
  }
};

// Function to get the general list of all tracks sorted alphabetically
const getAllTracks = async (req, res) => {
  try {
    const allTracksData = await TopTrack.findOne({ country: 'allTracks' });

    if (!allTracksData) {
      return res.status(404).json({ message: 'All tracks not found'});
    }

    res.status(200).json({ data: allTracksData.tracks });
  } catch (error) {
    console.error('Error fetching all tracks:', error);
    res.status(500).json({ message: 'Server error'});
  }
};

export { getTopTracks, getNewTopTracks, getAllTracks };