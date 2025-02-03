import express from 'express';
import { sendContactEmail } from '../controller/contactController.js';

const router = express.Router();

// Route for handling contact form submissions
router.post('/', sendContactEmail);

export default router;
