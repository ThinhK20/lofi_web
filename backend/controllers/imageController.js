const mongoose = require("mongoose");
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

        if (req.file.contentType != 'image/jpeg' && req.file.contentType != 'image/png' && req.file.contentType != 'image/svg+xml') {
            return res.status(403).json('Image type is not valid: ' +  req.file.contentType)
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
         console.log(req.params.imageName);
         gfs.find({ filename: req.params.imageName }).toArray((err, files) => {
            if (err) return res.status(500).json(err);
            console.log("FILE: " + files[0]);
            if (!files[0] || files.length <= 0) {
               return res.status(200).json("No files available");
            } 
               gfs.openDownloadStreamByName(req.params.imageName).pipe(res);
            
         });
      } catch (err) {
         return res.status(500).json(err);
      }
   },
};

module.exports = imageController;
