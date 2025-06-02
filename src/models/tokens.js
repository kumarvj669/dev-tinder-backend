const mongoose = require("mongoose");

tokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Token = mongoose.model("token", tokenSchema)

module.exports = Token