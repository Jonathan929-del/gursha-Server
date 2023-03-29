// Imports
import jwt from 'jsonwebtoken';





// Sign jwt token
const signToken = user => {
    return jwt.sign({
        username:user.username,
        email:user.email,
        id:user._id
    },
    process.env.SECRET_JWT_KEY,
    {
        expiresIn:'24h'
    });
};





// Export
export default signToken;