const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enums: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true});

const ConnectionRequest = mongoose.model("connectionrequests", connectionRequestSchema)

module.exports = ConnectionRequest;