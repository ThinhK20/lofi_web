const express = require('express');
const imageController = require('../controllers/imageController');
const uploadMulter = require('../utils');

const router = express.Router() 


router.post('/upload', uploadMulter.single('image') ,imageController.upload) 

// http://localhost:8000/v1/image/:imageName
router.get('/:imageName', imageController.renderImage)

module.exports = router