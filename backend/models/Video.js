const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    videoName: {
        required: true,
        type: String,
    },
    videoId: {
        required: true,
        type: String,
    },
    topic: {
        type: String,
        required: true
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;