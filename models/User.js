// Imports
import mongoose from 'mongoose';





// User schema
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    createdAt:String
});





// Export
export default mongoose.model('User', userSchema);