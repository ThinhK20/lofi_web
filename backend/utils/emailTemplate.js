const dotenv = require('dotenv')
dotenv.config()

const emailTemplate = {
    validateEmail: (id) => {
        return {
            to: process.env.EMAIL_ACCOUNT,
            from: process.env.EMAIL_ACCOUNT,
            subject: "Sending with Twillio Sendgrid",
            text: "We have got your account, please pass this ID to validate",
            html: `<span>We have got your account info, please pass this ID to validate your account: <strong>${id}</strong> </span>`
        }
    }
}


module.exports = emailTemplate