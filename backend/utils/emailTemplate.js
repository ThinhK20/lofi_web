const dotenv = require('dotenv')
dotenv.config()

const emailTemplate = {
    verifyEmail: (id, userEmail) => {
        return {
            to: userEmail,
            from: process.env.EMAIL_ACCOUNT,
            subject: "Sending with Twillio Sendgrid",
            text: "We have got your account, please pass this ID to verify",
            html: `<span>We have got your account info, please pass this ID to verify your account: <strong>${id}</strong> </span>`
        }
    }
}


module.exports = emailTemplate