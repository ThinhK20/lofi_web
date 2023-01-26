const imageController = require("../controllers/imageController")
const userController = require("../controllers/userController")
const uploadMulter = require("../utils")

const router = require("express").Router()


router.post('/upload/avatar/:id', uploadMulter.single('avatar'), userController.uploadAvatar, imageController.deleteFileFromFileName)

module.exports = router