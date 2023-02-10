const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const NotFoundError = require("../errors/NotFoundError");
const Image = require("../models/Image");
const variableApp = require("../utils/variable");

const connect = mongoose.createConnection(variableApp.mongooseUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
   gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads",
   });
});

const imageController = {
   upload: async (req, res) => {
      try {
         const image = await Image.findOne({ caption: req.body.caption });
         if (image) return res.status(200).json("Image already exists !");

         if (
            req.file.contentType != "image/jpeg" &&
            req.file.contentType != "image/png" &&
            req.file.contentType != "image/svg+xml"
         ) {
            return res
               .status(403)
               .json("Image type is not valid: " + req.file.contentType);
         }
         const newImage = new Image({
            caption: req.body.caption,
            imageName: req.file.filename,
            imageId: req.file.id,
         });
         await newImage.save();
         return res.status(200).json({
            message: "Upload image successfully",
            image: newImage,
         });
      } catch (err) {
         return res.status(500).json(err);
      }
   },
   // /image/:imageName
   renderImage: async (req, res) => {
      try {
         gfs.find({ filename: req.params.imageName }).toArray((err, files) => {
            if (err) return res.status(500).json(err);
            if (!files[0] || files.length <= 0) {
               return res.status(200).json("No files available");
            }
            gfs.openDownloadStreamByName(req.params.imageName).pipe(res);
         });
      } catch (err) {
         return res.status(500).json(err);
      }
   },
   deleteFileFromID: async (req, res) => {
      try {
         const imgID = req.params.id || req.user.avatar.id;
         gfs.delete(new mongoose.Types.ObjectId(imgID), (err, data) => {
            if (err)
               return res.status(404).json({
                  message: "Not found this file: " + err,
               });
            return res.status(200).json({
               message: `Deleted successfully !`,
            });
         });
      } catch (err) {
         return res.status(500).json(err);
      }
   },
   deleteFileFromFileName: async (req, res) => {
      try {
         gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (err) return res.status(500).json(err);
            if (!files[0] || files.length <= 0) {
               return res.status(200).json("No files available");
            }
            gfs.delete(
               new mongoose.Types.ObjectId(files[0]._id),
               (errDelete, data) => {
                  if (errDelete) {
                     throw new NotFoundError("Not found file: " + err);
                  }
                  if (!req.error) {
                     return res.status(StatusCodes.OK).json({
                        msg: "Deleted successfully !!!",
                     });
                  }
               }
            );
         });
      } catch (err) {
         console.log("WTF wrong in here: ", err);
         next(err);
      }
   },
};

module.exports = imageController;
