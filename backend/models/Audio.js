const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    audioName: {
        required: true,
        type: String,
    },
    audioId: {
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

const Audio = mongoose.model('Audio', AudioSchema);

module.exports = Audio;