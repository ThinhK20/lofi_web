const dotenv = require('dotenv')
dotenv.config()
const sgMail = require("@sendgrid/mail") 
const emailTemplate = require('../utils/emailTemplate')
sgMail.setApiKey(process.env.SENGRID_API_KEY)

const emailController = {
    verifyAccount: async(req, res) => {
        try {   
            const randomID = Math.floor(Math.random() * 899999 + 100000) 
            await sgMail.send(emailTemplate.verifyEmail(randomID, req.body.email))
            return res.status(200).json({
                message: "Send email successfully !",
                data: randomID
            })
        } catch(err) {
            return res.status(500).json(err)
        }
    },

}

module.exports = emailController