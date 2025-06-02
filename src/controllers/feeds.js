const User = require("../models/user")

const getFeeds = async (req, res) =>{
    try{
        const users = await User.find({$and: [
            {"_id": 
                { $not: 
                    {$eq: req.user._id}
                }
            },
            {"status": "Active"}
        ]})
        res.send({"Success": true, "Message": "Feeds fetched successfully", "data": users})
    }
    catch(err){
        res.status(500).send({"Success": false, "Message": err.message})
    }
}

module.exports = {
    getFeeds
}