const dotenv = require('dotenv')
dotenv.config()
const variableApp = {
    mongooseUrl: process.env.MONGOOSE_URL
}

module.exports = variableApp