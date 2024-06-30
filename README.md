# ------------------- #
# Spotify Ranking API #
# ___________________ #

# ---------------------------------- #
# Spotify Ranking React App (client) #
# __________________________________ #

This project is the client side of the Spotify Ranking application. It is built with React and allows users to view various music rankings fetched from the Spotify API. The application is designed with multiple tabs to display different rankings, including the overall top 50 tracks and country-specific rankings.

# Configuration
  * REACT_APP_API_KEY=your_api_key
  * REACT_APP_API_UR

# Installation
  * cd client
  * npm install
  * npm start

# ---------------------------- #
# Spotify Ranking API (server) #
# ____________________________ #

This is a Node.js server that fetches Spotify top tracks for different countries, saves them to a MongoDB database, and provides endpoints to access these tracks. The server also generates a new top 50 tracks list based on the data from various countries.

# Features
  * Fetch and save Spotify top tracks for different countries.
  * Generate a new top 50 tracks list.
  * Secure API endpoints with API key authentication.

# Requirements
  * Node.js
  * MongoDB

# Configuration
  * MONGODB_URL
  * SPOTIFY_CLIENT_ID
  * SPOTIFY_CLIENT_SECRET

# Installation
  * cd server
  * npm install
  * npm start