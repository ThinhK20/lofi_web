const googleController = require('../controllers/googleController')

const router = require('express').Router()


router.get('/', googleController.requestUser)
router.get('/callback', googleController.callbackResponse),
router.get('/loginInfo', googleController.getInfo)

module.exports = router