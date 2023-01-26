const Image = require("../models/Image")
const User = require("../models/User")

const userController = {
    uploadAvatar: async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) return res.status(403).json({
                message: "User is not exists !"
            }) 
            req.params.filename = user.avatar

            user.avatar = req.file.filename
            await Image.findOneAndDelete({caption:  "user-avatar__" + user.username})
            await user.save()
            const newImage = await new Image({
                caption: "user-avatar__" + user.username,
                imageName: req.file.filename,
                imageId: req.file.id,
             });
            await newImage.save()
            next()
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = userController