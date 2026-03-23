import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const router = express.Router();

// Chat endpoint
router.post('/', chatWithAI);

export default router;