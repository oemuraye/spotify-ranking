import express from 'express';
import { getTopTracks, getNewTopTracks } from '../controllers/trackController.js';
// import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/top-tracks/:country', getTopTracks);
router.get('/new-top-tracks', getNewTopTracks);

export default router;