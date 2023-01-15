import axios from "axios";

const audioFromTopicQuery = "http://localhost:8000/v1/audio/topic/"
const getAllAudioQuery = "http://localhost:8000/v1/audio"
const renderAudioQuery = "http://localhost:8000/v1/audio/"
const getAllAudioWithoutNoiseQuery = "http://localhost:8000/v1/audio/songs"

const audioAPI = {
    getAudioFromTopic: async(topic) => {
        return await axios.get(audioFromTopicQuery + topic)
    },
    getAllAudio: async() => {
        return await axios.get(getAllAudioQuery)
    },
    getAllAudioWithoutNoise: async() => {
        return await axios.get(getAllAudioWithoutNoiseQuery)
    },
    renderAudio: (audioName) => {
        return renderAudioQuery + audioName
    }
}

export default audioAPI