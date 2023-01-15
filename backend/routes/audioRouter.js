const express = require('express');
const AudioController = require('../controllers/audioController');
const uploadMulter = require('../utils');

const router = express.Router() 


router.post('/upload', uploadMulter.single('audio') ,AudioController.upload) 
router.get('/topic/:topic', AudioController.getAudiosFromTopic) 
router.get('/', AudioController.getAllAudio) 
router.get('/songs', AudioController.getAllSongWithoutNoise) 

router.get('/:audioName', AudioController.renderAudio)

module.exports = router