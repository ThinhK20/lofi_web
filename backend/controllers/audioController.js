const mongoose = require("mongoose");
const BadRequestError = require("../errors/BadRequestError");
const InvalidFileError = require("../errors/InvalidFileError");
const NotFoundError = require("../errors/NotFoundError");
const Audio = require("../models/Audio");
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

const AudioController = {
   upload: async (req, res, next) => {
      try {
         const audio = await Audio.findOne({ caption: req.body.caption });
         if (audio)
            throw new InvalidFileError(
               "Audio already exists !",
               req.file.filename
            );
         const newAudio = new Audio({
            caption: req.body.caption,
            audioName: req.file.filename,
            audioId: req.file.id,
            topic: req.body.topic,
         });
         await newAudio.save();
         return res.status(200).json({
            message: "Upload audio successfully !",
            video: newAudio,
         });
      } catch (err) {
         next(err);
      }
   },
   renderAudio: async (req, res, next) => {
      try {
         gfs.find({ filename: req.params.audioName }).toArray((err, files) => {
            try {
               if (err) throw new BadRequestError(err);
               if (!files[0] || files.length <= 0) {
                  throw new NotFoundError("No file available.");
               }
               gfs.openDownloadStreamByName(req.params.audioName).pipe(res);
            } catch (gfsErr) {
               next(gfsErr);
            }
         });
      } catch (err) {
         next(err);
      }
   },
   getAudiosFromTopic: async (req, res, next) => {
      try {
         const audios = await Audio.find({ topic: req.params.topic });
         return res.status(200).json(audios);
      } catch (err) {
         next(err);
      }
   },
   getAllAudio: async (req, res, next) => {
      try {
         const audio = await Audio.find();
         return res.status(200).json(audio);
      } catch (err) {
         next(err);
      }
   },
   getAllSongWithoutNoise: async (req, res, next) => {
      try {
         const audio = await Audio.find({ topic: { $ne: "audio-noise" } });
         return res.status(200).json(audio);
      } catch (err) {
         next(err);
      }
   },
};

module.exports = AudioController;
