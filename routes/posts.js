// Imports
import express from 'express';
import Post from '../models/Post.js';
import checkAuth from '../utils/checkAuth.js';
import {validatePostInput} from '../utils/validators.js';
const router = express.Router();





// Create post
router.post('/', async (req, res) => {
    try {
        const {body, video} = req.body;
        const user = checkAuth(req);
        const {errors, valid} = validatePostInput(video);
        if(!valid){
            res.status(400).json(errors);
        };
        const post = await Post.create({
            body,
            video,
            user:user.id,
            username:user.username,
            createdAt:new Date().toISOString()
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err.message);
    }
});





// Fetch feed posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});





// Export
export default router;