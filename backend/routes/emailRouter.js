const express = require('express')
const emailController = require('../controllers/emailController')

const router = express.Router()

router.get('/validate', emailController.validateEmail)

module.exports = router