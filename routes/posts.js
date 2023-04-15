// Imports
import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';
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
            likesCount:0,
            commentsCount:0,
            favouritesCount:0,
            sharesCount:0,
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





// Like post
router.put('/like/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const user = await User.findById(userId);
        const ids = post.likes.map(like => like.id);
        if(ids.includes(userId)){
            await post.updateOne({$pull:{likes:{
                id:userId
            }}, likesCount:post.likesCount - 1});
            res.status(200).json('Post unliked.');
        }else{
            await post.updateOne(
                {
                    $push:
                        {
                            likes:{
                                id:userId,
                                username:user.username,
                                createdAt:new Date().toISOString()
                            }
                        },
                        likesCount:post.likesCount + 1
                }
            );
            res.status(200).json('Post liked.');
        };
    } catch (err) {
        res.status(500).json(err.message);
    }
});





// Comment on post
router.put('/comment/:postId', async (req, res) => {
    try {
        const {postId} = req.params;
        const {body, userId} = req.body;
        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        await post.updateOne({$push:{
            comments:{
                id:user._id,
                username:user.username,
                body,
                createdAt:new Date().toISOString()
            }
        }});
        res.status(200).json('Comment posted.');
    } catch (err) {
        res.status(500).json(err);
    }
});





// Export
export default router;