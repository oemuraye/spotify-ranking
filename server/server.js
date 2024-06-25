import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db.js';

// import apiRoutes from './routes/api.js';
// import authRoutes from './routes/auth.js';

// import apiLimiter from './utils/rateLimit.js';
import fetchData from './services/spotifyService.js';
// import { saveData } from './services/trackService.js';

const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use('/api/', apiLimiter);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Social App Api')
})
// app.use('/api', apiRoutes);
// app.use('/auth', authRoutes);

// Fetch and save data on startup
const initializeData = async () => {
  const data = await fetchData();
  // await saveData(data);
  // console.log(data);
  console.log('Data fetched and saved');
};

// initializeData();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
