const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Image = require("../models/Image");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const InvalidFileError = require("../errors/InvalidFileError");

const authController = {
   register: async (req, res, next) => {
      try {
         if (
            req.file.contentType != "image/jpeg" &&
            req.file.contentType != "image/png" &&
            req.file.contentType != "image/svg+xml"
         ) {
            throw new InvalidFileError(
               "Image type is not valid: " + req.file.contentType,
               req.file.filename
            );
         }

         const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file.filename,
            lofiUsername: req.body.lofiUsername,
         });

         const newImage = new Image({
            caption: "user-avatar__" + req.body.username,
            imageName: req.file.filename,
            imageId: req.file.id,
         });

         await newUser.save();
         await newImage.save();
         const { password, ...userDTO } = newUser._doc;

         return res.status(200).json({
            message: "Register successfully !",
            user: { ...userDTO },
         });
      } catch (err) {
         err.filename = req.file.filename;
         next(err, req);
      }
   },
   generateAccessToken: (data) => {
      return jwt.sign(
         {
            username: data.username,
            admin: data.admin,
            _id: data._id,
         },
         process.env.ACCESS_TOKEN,
         {
            expiresIn: "1d",
         }
      );
   },
   login: async (req, res, next) => {
      try {
         const user = await User.findOne({ username: req.body.username });
         if (!user) {
            throw new NotFoundError("This account doesn't exists !");
         }
         const passwordEncode = await bcrypt.compareSync(
            req.body.password,
            user.password
         );
         if (!passwordEncode) {
            throw new BadRequestError("The password is incorrect !");
         }
         const accessToken = authController.generateAccessToken(user);

         const { password, _id, admin, ...userDTO } = user._doc;
         return res.status(200).json({
            user: userDTO,
            accessToken,
         });
      } catch (err) {
         next(err);
      }
   },
   delete: async (req, res, next) => {
      try {
         const user = await User.findById(req.params.id);
         if (!user) {
            throw new NotFoundError("The user doesn't exists !");
         }
         return res.status(200).json("Deleted successfully !");
      } catch (err) {
         next(err);
      }
   },
   verifyUser: async (req, res, next) => {
      try {
         const user = await User.findOne({ email: req.params.email });
         if (!user) {
            throw new NotFoundError("User doesn't exists !");
         }
         user.verified = true;
         await user.save();
         return res.status(200).json("Verified successfully !");
      } catch (err) {
         next(err);
      }
   },
};

module.exports = authController;
