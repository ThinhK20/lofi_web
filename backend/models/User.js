const mongoose = require("mongoose")
const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
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
    verified: {
        type: Boolean,
        default: false
    },
    profile: {
        wallpaper: {
            type: String,
            default: "c5630f2b69d4c3d762d3aab8716f68e1.jpg"
        }   
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", UserScheme)