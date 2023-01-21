const User = require("../models/User")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken") 
const Image = require("../models/Image")

const authController = {
    register: async(req, res) => {  
        console.log(req.body)
        console.log("File: ", req.file)
        try { 
            if (req.file.contentType != 'image/jpeg' && req.file.contentType != 'image/png' && req.file.contentType != 'image/svg+xml') {
                return res.status(403).json({
                    message: 'Image type is not valid: ' +  req.file.contentType
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)  
            const user = await User.findOne({ username: req.body.username }) 
            if (user) return res.status(403).json({ 
                message: "Username already exists !"
            }) 
            console.log("Running here...")
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                avatar: req.file.filename,
                lofiUsername: req.body.lofiUsername
            })  
            const newImage = await new Image({
                caption: "user-avatar__" + req.body.username,
                imageName: req.file.filename,
                imageId: req.file.id,
             });
            await newUser.save();
            await newImage.save();
            const { password, ...userDTO }  = newUser._doc
            return res.status(200).json({
                message: "Register successfully !",
                user: {...userDTO}
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    }, 
    generateAccessToken: (data) => {
        return jwt.sign({
            username: data.username,
            admin: data.admin,
            _id: data._id
        }, process.env.ACCESS_TOKEN, {
            expiresIn: "1d"
        })
    },
    login: async(req, res) => {
        try {
             const user = await User.findOne({username: req.body.username})
             if (!user) {
                 return res.status(500).json("Bad request!")
            }
            const passwordEncode = await bcrypt.compareSync(req.body.password, user.password)
            if (!passwordEncode) {
                return res.status(500).json("Password is not correct !")
            } 
            const accessToken = authController.generateAccessToken(user) 
            const {password, _id, admin, ...userDTO} = user._doc
            return res.status(200).json({
                user: userDTO,
                accessToken
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    delete: async(req, res) => {
        try {
            console.log("ID: ", req.params.id) 
            const user = await User.findById(req.params.id) 
            if (!user) {
                return res.status(500).json("User is not exist !")
            }
            return res.status(200).json("Deleted successfully !")
        } catch(err) {
            return res.status(500).json(err)
        }
    }, 
    verifyUser: async(req, res) => {
        try {
            const user = await User.findOne({email: req.params.email}) 
            if (!user) {
                return res.status(500).json("User is not exist !")
            } 
            user.verified = true
            await user.save()
            return res.status(200).json("Verified successfully !")
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = authController