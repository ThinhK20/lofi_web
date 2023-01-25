const mongoose = require('mongoose');
const Video = require('../models/Video');
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

const videoController = {
    upload: async(req, res) => { 
        try {
            const existingVideo = await Video.findOne({ caption: req.body.caption, topic: req.body.topic }) 
            if (existingVideo) return res.status(200).json("Video already exists !") 
            if (req.file.contentType != 'video/mp4' && req.file.contentType != 'video/x-matroska') {
                return res.status(403).json('Video type is not valid: ' +  req.file.contentType)
            }
            const newVideo = new Video({
                caption: req.body.caption,
                videoName: req.file.filename,
                videoId: req.file.id,
                topic: req.body.topic
            })
            await newVideo.save()
            return res.status(200).json({
                message: "Upload video successfully !",
                video: newVideo
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    renderVideo: async(req, res) => {
        try { 
            gfs.find({ filename: req.params.videoName }).toArray((err, files) => {
                if (err) return res.status(500).json(err)
                if (!files[0] || files.length <= 0) {
                    return res.status(200).json("No files available")
                }   
                // res.writeHead(200, {
                //     'Content-Type': 'video/mp4',
                //     'Accept-Ranges': 'bytes',
                //     'Connection': 'Keep-Alive',
                //     'Transfer-encoding': 'chunked',
                //     'Content-Length': files[0].length
                // });
                gfs.openDownloadStreamByName(req.params.videoName).pipe(res);
    
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    getVideosFromTopic: async(req, res) => {
        try {
            const videos = await Video.find({topic: req.params.topic }) 
            return res.status(200).json(videos)
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = videoController