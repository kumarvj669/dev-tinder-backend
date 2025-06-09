const ConnectionRequest = require("../models/ConnectionRequest")
const User = require("../models/user")

const getFeeds = async (req, res) =>{
    try{
        const loggedInUser = req.user._id
        const removeFromFeedUsers = await ConnectionRequest.find(
            {
                "sender": loggedInUser,
                $and : [
                    {"receiver": loggedInUser},
                    {"status": {$in : ["Ignored", "Rejected"]}}
                ]
            }
        ).select("_id")
        const uIds = removeFromFeedUsers.map(user => user._id.toString())
        res.send(uIds)
        const users = await User.find({$and: [
            {"_id": 
                { $nin: 
                    uIds
                }
            },
            {"status": "Active"}
        ]}).select("firstName lastName photoUrl")
        res.send({"Success": true, "Message": "Feeds fetched successfully", "data": users})
    }
    catch(err){
        res.status(500).send({"Success": false, "Message": err.message})
    }
}

module.exports = {
    getFeeds
}