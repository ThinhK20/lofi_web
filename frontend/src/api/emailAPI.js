import axios from "axios"

const verifyAccountQuery = "http://localhost:8000/v1/email/verify"


const emailAPI = {
    verifyAccount: async(email) => {
        const result = await axios.post(verifyAccountQuery, email)
        return result
    },
    
} 

export default emailAPI