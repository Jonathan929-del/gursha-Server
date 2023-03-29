// Imports
import express from 'express';
import Post from '../models/Post.js';
const router = express.Router();





// Register user
router.post('/', async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
    } catch (err) {
        res.status(500).json(err);
    }
});





// Export
export default router;