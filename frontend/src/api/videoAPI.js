import axios from "axios"
const uploadQuery = "http://localhost:8000/v1/video/upload" 
const getVideosQuery = "http://localhost:8000/v1/video/topic/" 
const getVideoQuery = "http://localhost:8000/v1/video/"

const videoAPI = { 
    uploadVideo: async(data) => {
        return await axios.post(uploadQuery, data)
    },
    getVideosFromTopic: async(topic) => {
        return await axios.get(getVideosQuery + topic) 
    },
    getVideo: (videoName) => {
        return getVideoQuery + videoName
    }
}

export default videoAPI