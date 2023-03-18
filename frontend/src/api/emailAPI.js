import axios from "axios";

const verifyAccountQuery = "https://lofi-chill-api.onrender.com/v1/email/verify";

const emailAPI = {
    verifyAccount: async (email) => {
        const result = await axios.post(verifyAccountQuery, email);
        return result;
    },
};

export default emailAPI;
