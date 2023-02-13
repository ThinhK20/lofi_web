const { StatusCodes } = require("http-status-codes");
const fileController = require("../controllers/fileController");
const errorHandlerMiddleware = (err, req, res, next) => {
   const defaultError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || "Something went wrong, try again later.",
   };

   if (err.name === "ValidationError") {
      defaultError.statusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = Object.values(err.errors)
         .map((value) => value.message)
         .join(",");
   }

   if (err.filename) {
      req.params.filename = err.filename;
      req.error = true;
      fileController.deleteFileFromFileName(req);
   }

   if (err.code && err.code === 11000) {
      defaultError.statusCode = StatusCodes.BAD_REQUEST;
      const attributeValue = Object.keys(err.keyValue).map((key) => key);
      defaultError.msg = `${attributeValue} field has to be unique (duplicated ${err.keyValue[attributeValue]}).`;
   }
   res.status(defaultError.statusCode).json({
      msg: defaultError.msg,
   });
};
module.exports = errorHandlerMiddleware;
