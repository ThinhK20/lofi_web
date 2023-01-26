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
        minLength: 6,
        unique: true
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
        },
        gender: {
            type: String,
            default: "Other"
        },
        location: {
            type: String,
            default: ""
        },
        birthdate: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        phone:  {
            type: String,
            default: ""
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", UserScheme)