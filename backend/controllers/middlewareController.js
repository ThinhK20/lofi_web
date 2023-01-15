const jwt = require("jsonwebtoken")
const middlewareController = {
    verifyToken: async(req, res, next) => {
        const accessToken = req.headers.token 
        if (accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json("You're not authenticated")
        }
   
    },
    verifyTokenAndAdmin: async(req, res,next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.admin == true) {
               return next();
            }
            return res.status(500).json("You're not the admin")
            
        })
    }
} 

module.exports = middlewareController