// Imports
import mongoose from 'mongoose';





// User schema
const postSchema = new mongoose.Schema({
    username:String,
    video:String,
    body:String,
    likesCount:Number,
    commentsCount:Number,
    favouritesCount:Number,
    sharessCount:Number,
    createdAt:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    likes:[{
        username:String,
        createdAt:String
    }],
    comments:[{
        body:String,
        username:String,
        createdAt:String
    }]
});





// Export
export default mongoose.model('Post', postSchema);