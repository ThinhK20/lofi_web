const mongoose = require("mongoose")
const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        maxLength: 20
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    email: {
        type: String,
        require: true, 
        unique: true,
        minLength: 6
    }, 
    avatar: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    lofiUsername: {
        type: String,
        require: true
    },
    validated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", UserScheme)