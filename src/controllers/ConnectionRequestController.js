const { validateConnectionRequest} = require("../utils/ValidateInput");
const User = require("../models/user");
const ConnectionRequest = require("../models/ConnectionRequest");
const sendConnectionRequest = async (req, res) => {
    try{
        validateConnectionRequest(req)
        const user = req.user;
        const profileId = await User.findOne({"_id": req.body.profile_id, "status": "Active"});
        if(profileId){
            const existingRequest = await ConnectionRequest.findOne({ $or: [
                {"sender": profileId._id, "receiver": user._id},
                {"sender": user._id, "receiver": profileId._id}
            ]})
            console.log("outgoing:", existingRequest)
            if(profileId._id == user._id){
                res.send({"Success": true, "Message": "Connection request can't be sent to yourself"});
            }
            else if(existingRequest){
                res.send({"Success": true, "Message": "Connection request already exists"});
            }
            else{
                const request = new ConnectionRequest
                request.sender = user._id;
                request.receiver = profileId._id
                request.status = "Pending"
                await request.save()
                res.send({"Success": true, "Message": "Connection request sent successfully"})
            }
        }else{
            res.status(404).send({"Success": false, "Message": "Profile not found!"});
        }

    }
    catch(err){
        res.status(500).send({"Success": false, "Message": err.message})
    }

}

const getConnectionRequests = async (req, res) => {
    try{
        const user = req.user
        const connectionRequests = await ConnectionRequest.find({"receiver": user._id})
        res.send({ "Success" : true, "Message": "Conncetion request fetched successfully", "data": connectionRequests} )
    }
    catch(err){
        res.status(500).send({"Success": false, "Message": err.message})
    }
}

module.exports = {
    sendConnectionRequest,
    getConnectionRequests
}