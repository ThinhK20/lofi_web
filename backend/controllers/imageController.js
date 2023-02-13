const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const BadRequestError = require("../errors/BadRequestError");
const InvalidFileError = require("../errors/InvalidFileError");
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
   upload: async (req, res, next) => {
      try {
         const image = await Image.findOne({ caption: req.body.caption });
         if (image)
            throw new InvalidFileError(
               "Image already exists",
               req.file.filename
            );

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
         const newImage = new Image({
            caption: req.body.caption,
            imageName: req.file.filename,
            imageId: req.file.id,
         });
         await newImage.save();
         return res.status(200).json({
            msg: "Upload image successfully",
            image: newImage,
         });
      } catch (err) {
         next(err);
      }
   },
   // /image/:imageName
   renderImage: async (req, res, next) => {
      try {
         gfs.find({ filename: req.params.imageName }).toArray((err, files) => {
            try {
               if (err)
                  throw new BadRequestError("There's an error occurs: " + err);
               if (!files[0] || files.length <= 0) {
                  throw new NotFoundError("No file available.");
               }
               gfs.openDownloadStreamByName(req.params.imageName).pipe(res);
            } catch (gfsError) {
               next(gfsError);
            }
         });
      } catch (err) {
         next(err);
      }
   },
   deleteFileFromID: async (req, res, next) => {
      try {
         const imgID = req.params.id || req.user.avatar.id;
         gfs.delete(new mongoose.Types.ObjectId(imgID), (err, data) => {
            try {
               if (err) throw new NotFoundError("No file available: " + imgID);
               return res.status(200).json({
                  msg: `Deleted successfully !`,
               });
            } catch (gfsErr) {
               next(gfsErr);
            }
         });
      } catch (err) {
         next(err);
      }
   },
   deleteFileFromFileName: async (req, res, next) => {
      try {
         gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            try {
               if (err)
                  throw new BadRequestError("There's an error occurs " + err);
               if (!files[0] || files.length <= 0) {
                  throw new NotFoundError("No file available.");
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
            } catch (gfsError) {
               next(gfsError);
            }
         });
      } catch (err) {
         next(err);
      }
   },
};

module.exports = imageController;
