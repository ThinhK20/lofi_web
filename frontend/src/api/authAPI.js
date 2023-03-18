import axios from "axios";
const loginQuery = "https://lofi-chill-api.onrender.com/v1/auth/login";
const verifyQuery = "https://lofi-chill-api.onrender.com/v1/auth/verify/";
const registerQuery = "https://lofi-chill-api.onrender.com/v1/auth/register";

const authAPI = {
    loginUser: (body) => {
        return axios.post(loginQuery, body);
    },
    verifyUser: async (email) => {
        const result = await axios.get(verifyQuery + email);
        return result;
    },
    registerUser: async (body) => {
        await axios.post(registerQuery, body, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

export default authAPI;
