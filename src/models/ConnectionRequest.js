const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected", "Ignored"],
        default: "Pending"
    }
}, { timestamps: true});

const ConnectionRequest = mongoose.model("connectionrequests", connectionRequestSchema)

module.exports = ConnectionRequest;