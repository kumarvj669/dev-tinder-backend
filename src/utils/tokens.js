const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = async (payload, type) => {
    try{
        let secretKey = null;
        let expiresIn = null
        switch(type){
            case "access":
                secretKey = process.env.PRIVATE_KEY;
                expiresIn = 120;
            case "refresh":
                secretKey = process.env.REFRESH_PRIVATE_KEY
                expiresIn = "7d"
        }
        const token = await jwt.sign(payload, secretKey, { expiresIn: expiresIn})
        return token;
    }
    catch(err){
        throw new Error(err.message)
    }
}


const verifyToken = async (token, type) => {
    try{
        let secretKey = null
        switch(type){
            case "access":
                secretKey = process.env.PRIVATE_KEY
            case "refresh":
                secretKey = process.env.REFRESH_PRIVATE_KEY
        }
        const userID = await jwt.verify(token, secretKey)
        return userID
    }
    catch(err){
        throw new Error(err.message);
    }
}

const generateAccessTokenFromRefreshToken = async (refreshToken) => {
    try{
        const { userId } = verifyToken(refreshToken, "refresh");
        const existingUser = await User.findById(userId);
        const accessToken = generateToken({"id": existingUser._id}, "access")
        const refreshToken = generateToken({"id": existingUser._id}, "refresh")
        return {accessToken, refreshToken, existingUser};
    }
    catch(err){
        throw new Error(err.message);
    }
}


module.exports = {
    generateToken,
    verifyToken,
    generateAccessTokenFromRefreshToken
}