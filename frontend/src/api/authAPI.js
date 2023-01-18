import axios from "axios"
const loginQuery = "http://localhost:8000/v1/auth/login"
const verifyQuery = "http://localhost:8000/v1/auth/verify/"

const authAPI = {
    loginUser: (body) => {
        return axios.post(loginQuery, body)
    },
    verifyUser: async(email) => {
        const result = await axios.get(verifyQuery + email) 
        return result
    }
} 

export default authAPI