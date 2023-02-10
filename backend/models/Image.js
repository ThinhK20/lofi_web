const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
   caption: {
      required: [true, "Please provide image caption"],
      type: String,
   },
   imageName: {
      required: [true, "Please provide image name"],
      type: String,
   },
   imageId: {
      required: [true, "Please provide image id"],
      type: String,
   },
   createdAt: {
      default: Date.now(),
      type: Date,
   },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
