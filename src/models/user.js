const mongoose = require("mongoose");
const checkValidator = require("validator");
const userSchema =  mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firsname name can't be blank"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email can't be blank"],
        unique: true,
        validate: {
            validator: function(value){
                return checkValidator.isEmail(value)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        minLength:6,
        validate: {
            validator: function(value){
                return checkValidator.isStrongPassword(value)
            },
            message: props => `${props.value} is not strong password`
        }
    },
    photoUrl: {
        type: String,
        MaxLength: 255
    },
    status: {
        type: String,
        enum: {
            values: ["Active", "Inactive"],
            message: "{VALUE} not supported"
        },
        default: "Active"
    },
    skills: Array
}, {timestamps: true});

const User = mongoose.model("users", userSchema);

module.exports = User