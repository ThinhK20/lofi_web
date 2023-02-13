const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const middlewareController = {
   verifyToken: async (req, res, next) => {
      const accessToken = req.headers.token;
      if (accessToken) {
         jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
               throw new BadRequestError("Token is not valid.");
            }
            req.user = user;
            next();
         });
      } else {
         next(err);
      }
   },
   verifyTokenAndAdmin: async (req, res, next) => {
      middlewareController.verifyToken(req, res, () => {
         if (req.user.admin == true) {
            return next();
         }
         return res.status(500).json("You're not the admin");
      });
   },
};

module.exports = middlewareController;
