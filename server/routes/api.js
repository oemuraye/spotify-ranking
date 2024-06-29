import express from 'express';
import { getTopTracks, getNewTopTracks, getAllTracks } from '../controllers/trackController.js';
import { generatingApiKey } from '../controllers/apiKeyControllers.js';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';

const router = express.Router();

router.get('/top-tracks/:country', apiKeyAuth, getTopTracks);
router.get('/new50-top-tracks', apiKeyAuth, getNewTopTracks);
router.get('/all-tracks', apiKeyAuth, getAllTracks);
router.get('/generate-api-key', generatingApiKey);

export default router;