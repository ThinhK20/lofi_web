const mongoose = require("mongoose");
const BadRequestError = require("../errors/BadRequestError");
const InvalidFileError = require("../errors/InvalidFileError");
const NotFoundError = require("../errors/NotFoundError");

const Video = require("../models/Video");
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

const videoController = {
   upload: async (req, res, next) => {
      try {
         const existingVideo = await Video.findOne({
            caption: req.body.caption,
            topic: req.body.topic,
         });
         if (existingVideo) {
            throw new InvalidFileError(
               "Video already exists !",
               req.file.filename
            );
         }
         if (
            req.file.contentType != "video/mp4" &&
            req.file.contentType != "video/x-matroska"
         ) {
            throw new InvalidFileError(
               "Video type is not valid: " + req.file.contentType,
               req.file.filename
            );
         }
         const newVideo = new Video({
            caption: req.body.caption,
            videoName: req.file.filename,
            videoId: req.file.id,
            topic: req.body.topic,
         });
         await newVideo.save();
         return res.status(200).json({
            message: "Upload video successfully !",
            video: newVideo,
         });
      } catch (err) {
         next(err);
      }
   },
   renderVideo: async (req, res, next) => {
      try {
         gfs.find({ filename: req.params.videoName }).toArray((err, files) => {
            try {
               if (err) throw new BadRequestError(err);
               if (!files[0] || files.length <= 0) {
                  throw new NotFoundError("No file available.");
               }
               res.set("Access-Control-Allow-Origin", "*");
               res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
               gfs.openDownloadStreamByName(req.params.videoName).pipe(res);
            } catch (gfsErr) {
               next(gfsErr);
            }
         });
      } catch (err) {
         next(err);
      }
   },
   getVideosFromTopic: async (req, res, next) => {
      try {
         const videos = await Video.find({ topic: req.params.topic });
         return res.status(200).json(videos);
      } catch (err) {
         next(err);
      }
   },
};

module.exports = videoController;
