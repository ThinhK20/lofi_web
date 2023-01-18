const express = require('express')
const emailController = require('../controllers/emailController')

const router = express.Router()

router.post('/verify', emailController.verifyAccount)

module.exports = router