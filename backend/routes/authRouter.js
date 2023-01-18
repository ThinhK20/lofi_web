const authController = require("../controllers/authController")
const middlewareController = require("../controllers/middlewareController")
const uploadMulter = require("../utils")

const router = require("express").Router()

router.post("/register", uploadMulter.single('avatar'), authController.register)
router.post("/login", authController.login)
router.delete("/delete/:id", middlewareController.verifyToken, authController.delete)
router.get("/verify/:email", authController.verifyUser)

module.exports = router