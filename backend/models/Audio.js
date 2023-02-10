const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AudioSchema = new Schema(
   {
      caption: {
         required: [true, "Please provide audio caption"],
         type: String,
      },
      audioName: {
         required: [true, "Please provide audio name"],
         type: String,
      },
      audioId: {
         required: [true, "Please provide audio id"],
         type: String,
      },
      topic: {
         type: String,
         required: [true, "Please provide audio topic"],
      },
      createdAt: {
         default: Date.now(),
         type: Date,
      },
   },
   { timestamps: true }
);

const Audio = mongoose.model("Audio", AudioSchema);

module.exports = Audio;
