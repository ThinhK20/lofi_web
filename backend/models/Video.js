const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
   {
      caption: {
         required: [true, "Please provide video caption"],
         type: String,
      },
      videoName: {
         required: [true, "Please provide video name"],
         type: String,
      },
      videoId: {
         required: [true, "Please provide video id"],
         type: String,
      },
      topic: {
         type: String,
         required: [true, "Please provide video topic"],
      },
      createdAt: {
         default: Date.now(),
         type: Date,
      },
   },
   { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
