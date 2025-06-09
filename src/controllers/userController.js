const { validateSignupRequest, validateLoginRequest } = require("../utils/ValidateInput");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/tokens");
const {generateToken, verifyToken} = require("../utils/tokens");

const signup =  async (req, res) => {
    try{
        validateSignupRequest(req);
        const user = new User();
        user.firstName = req.body.firstname;
        user.lastName = req.body.lastname;
        user.email = req.body.email;
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        user.password = passwordHash;
        user.skills = req.body.skills;
        user.photoUrl = req.body.photourl;
        await user.save()
        res.send({"success": true, "message": "User created successfully"});
    }
    catch(error){
        res.status(500).send({"Success": false, "message": error.message})
    }
    
}

const login = async (req, res) => {
    try{
        validateLoginRequest(req);
        const user = await User.findOne({"email": req.body.email});
        if(!user){
            res.status(404).send({"Success": false, "Message": "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const accessToken = await generateToken({"id": user._id}, "access")
            const refreshToken =await generateToken({"id": user._id}, "refresh")
            const tokenData = await Token.findOne({"id": user._id}) ?? new Token();
            tokenData.user_id = user._id
            tokenData.accessToken = accessToken
            tokenData.refreshToken = refreshToken
            await tokenData.save();
            res.cookie("accessToken", tokenData.accessToken);
            res.cookie("refreshToken", tokenData.refreshToken);
            res.send({"Success": true, "Message": "User loggedin successfully", "Data": user});
        }
        else{
            res.status(401).send({"Success": false, "message": "Invalid credentials"})
        }
    }
    catch(err){
        res.status(500).send({"Success": false, "message": err.message})
    }
}

const profile = async (req, res) => {
    try{
        const user =  req.user;
        res.send({"Success": true, "Message": "Profile fetched successfully", "data": user});
    }
    catch(err){
        res.status(500).send({"Success": true, "Message": err.message})
    }
}
module.exports = {
    signup,
    login,
    profile
}