import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db.js';

import apiRoutes from './routes/api.js';
// import authRoutes from './routes/auth.js';

// import apiLimiter from './utils/rateLimit.js';
import fetchData from './services/spotifyService.js';
import { generateNewTop50, initializeData } from './services/trackService.js';

const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use('/api/', apiLimiter);

// Routes
app.get('/', async (req, res) => {
  res.send('Welcome to Social App Api')
})

app.use('/api', apiRoutes);
// app.use('/auth', authRoutes);

// initializeData();

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
