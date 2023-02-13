const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
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

const fileController = {
   deleteFileFromID: async (req, res, next) => {
      try {
         const fileID = req.params.id || req.user.avatar.id;
         gfs.delete(new mongoose.Types.ObjectId(fileID), (err, data) => {
            try {
               if (err)
                  throw new NotFoundError("Not found this file: " + fileID);
               return res.status(200).json({
                  message: `Deleted successfully !`,
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
                  throw new BadRequestError("There's an error occurs: " + err);
               if (!files[0] || files.length <= 0) {
                  throw new NotFoundError("No file available.");
               }
               gfs.delete(
                  new mongoose.Types.ObjectId(files[0]._id),
                  (errDelete, data) => {
                     if (errDelete) {
                        throw new NotFoundError("Not found file: " + err);
                     }
                  }
               );
            } catch (gfsErr) {
               next(gfsErr);
            }
         });
      } catch (err) {
         next(err);
      }
   },
};

module.exports = fileController;
