import axios from "axios";

const audioFromTopicQuery = "https://lofi-chill-api.onrender.com/v1/audio/topic/";
const getAllAudioQuery = "https://lofi-chill-api.onrender.com/v1/audio";
const renderAudioQuery = "https://lofi-chill-api.onrender.com/v1/audio/";
const getAllAudioWithoutNoiseQuery = "https://lofi-chill-api.onrender.com/v1/audio/songs";

const audioAPI = {
    getAudioFromTopic: async (topic) => {
        return await axios.get(audioFromTopicQuery + topic);
    },
    getAllAudio: async () => {
        return await axios.get(getAllAudioQuery);
    },
    getAllAudioWithoutNoise: async () => {
        return await axios.get(getAllAudioWithoutNoiseQuery);
    },
    renderAudio: (audioName) => {
        return renderAudioQuery + audioName;
    },
};

export default audioAPI;
