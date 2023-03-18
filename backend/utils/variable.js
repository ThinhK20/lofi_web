const dotenv = require("dotenv");
dotenv.config();
const variableApp = {
   mongooseUrl: process.env.MONGODB_URI,
};

module.exports = variableApp;
