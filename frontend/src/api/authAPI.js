import axios from "axios"
const loginQuery = "http://localhost:8000/v1/auth/login"

const authAPI = {
    loginUser: (body) => {
        return axios.post(loginQuery, body)
    }
} 

export default authAPI