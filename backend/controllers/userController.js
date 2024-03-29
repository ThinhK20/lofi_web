const NotFoundError = require("../errors/NotFoundError");
const Image = require("../models/Image");
const User = require("../models/User");

const userController = {
   uploadAvatar: async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);
         if (!user) throw new NotFoundError("This user doesn't exists.");
         req.params.filename = user.avatar;

         user.avatar = req.file.filename;
         await Image.findOneAndDelete({
            caption: "user-avatar__" + user.username,
         });
         await user.save();
         const newImage = await new Image({
            caption: "user-avatar__" + user.username,
            imageName: req.file.filename,
            imageId: req.file.id,
         });
         await newImage.save();
         next();
      } catch (err) {
         next(err);
      }
   },
   updateProfileInfo: async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);
         if (!user) throw new NotFoundError("This user doesn't exists.");
         user.profile = {
            ...user.profile,
            birthdate: req.body.birthdate,
            facebook: req.body.facebook,
            gender: req.body.gender,
            location: req.body.location,
            phone: req.body.phone,
            twitter: req.body.twitter,
         };
         await user.save();
         return res.status(200).json({
            message: "Update successfully !",
         });
      } catch (err) {
         next(err);
      }
   },
   uploadWallpaper: async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);
         if (!user) throw new NotFoundError("This user doesn't exists.");
         req.params.filename = user.profile.wallpaper;

         user.profile.wallpaper = req.file.filename;
         await Image.findOneAndDelete({
            caption: "user-wallpaper__" + user.username,
         });
         await user.save();
         const newImage = await new Image({
            caption: "user-wallpaper__" + user.username,
            imageName: req.file.filename,
            imageId: req.file.id,
         });
         await newImage.save();
         if (req.params.filename === process.env.DEFAULT_WALLPAPER)
            return res.status(200).json({
               message: "Upload successfully !",
            });
         next();
      } catch (err) {
         next(err);
      }
   },
};

module.exports = userController;
