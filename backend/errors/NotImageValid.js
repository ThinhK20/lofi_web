const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class NotImageValid extends CustomAPIError {
   constructor(message, filename) {
      super(message);
      this.statusCode = StatusCodes.NOT_ACCEPTABLE;
      this.filename = filename;
   }
}

module.exports = NotImageValid;
