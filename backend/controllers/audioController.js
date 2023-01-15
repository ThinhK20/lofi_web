const mongoose = require('mongoose');
const Audio = require('../models/Audio');
const variableApp = require('../utils/variable');


const connect = mongoose.createConnection(variableApp.mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

let gfs;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads'
    })
})

const AudioController = {
    upload: async(req, res) => { 
        try {
            const audio = await Audio.findOne({ caption: req.body.caption })
            if (audio) return res.status(200).json("Audio already exists !") 
            const newAudio = new Audio({
                caption: req.body.caption,
                audioName: req.file.filename,
                audioId: req.file.id,
                topic: req.body.topic
            })
            await newAudio.save()
            return res.status(200).json({
                message: "Upload audio successfully !",
                video: newAudio
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    renderAudio: async(req, res) => {
        try { 
            gfs.find({ filename: req.params.audioName }).toArray((err, files) => {
                if (err) return res.status(500).json(err)
                if (!files[0] || files.length <= 0) {
                    return res.status(200).json("No files available")
                }   
                gfs.openDownloadStreamByName(req.params.audioName).pipe(res);
    
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    getAudiosFromTopic: async(req, res) => {
        try {
            const audios = await Audio.find({topic: req.params.topic }) 
            return res.status(200).json(audios)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    getAllAudio: async(req, res) => {
        try {
            const audio = await Audio.find()
            return res.status(200).json(audio)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    getAllSongWithoutNoise: async(req, res) => {
        try {
            const audio = await Audio.find({ topic: {$ne: "audio-noise"} })
            return res.status(200).json(audio)
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = AudioController