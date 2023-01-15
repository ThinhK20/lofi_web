const express = require('express');
const videoController = require('../controllers/videoController');
const uploadMulter = require('../utils');

const router = express.Router() 


router.post('/upload', uploadMulter.single('video') ,videoController.upload) 
router.get('/topic/:topic', videoController.getVideosFromTopic) 

// http://localhost:8000/v1/video/:videoName
router.get('/:videoName', videoController.renderVideo)

module.exports = router