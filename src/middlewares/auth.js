const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {generateToken, verifyToken, generateAccessTokenFromRefreshToken} = require("../utils/tokens");
const Token = require("../models/tokens");
const userAuth = async (req, res, next) => {
    try{
        if(req.path == "/" || req.path == "/signup" || req.path == "/login"){
            next();
        }
        else if(req.cookies.accessToken){
            const {id} = await verifyToken(req.cookies.accessToken, "access")
            const user = await User.findById(id);
            if(!user){
                res.status(401).send({"Success": false, "Message": "Unauthenticated request!"});
            }
            else{
                req.user = user;
                next();
            }
        }
        else{
            res.status(401).send({"Success":false, "Message":"Unauthenticated request!"})
        }
    }
    catch(err){
        if(err.message == 'jwt expired'){
            const token = req.cookies.refreshToken;
            const {accessToken, refreshToken, userData} = generateAccessTokenFromRefreshToken(token)
            const userTokens = await Token.updateOne({"user_id": userData._id}, {"accessToken": accessToken, "refreshToken": refreshToken});
            res.cookie("accessToken", userTokens.accessToken)
            res.cookie("refrshToken", userTokens.refreshToken)
        }
    }
}
module.exports = {
    userAuth
}