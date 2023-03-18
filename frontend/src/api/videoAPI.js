import axios from "axios";

const uploadQuery = "http://localhost:8000/v1/video/upload";
const getVideosQuery = "http://localhost:8000/v1/video/topic/";
const getVideoQuery = "http://localhost:8000/v1/video/";

const videoAPI = {
    uploadVideo: async (data) => {
        return await axios.post(uploadQuery, data);
    },
    getVideoUrlsFromTopic: async (topic) => {
        const videoURLs = await axios.get(getVideosQuery + topic);
        return videoURLs.data;
    },
    getVideo: (videoName) => {
        const videos = getVideoQuery + videoName;
        return videos;
    },
};

export default videoAPI;
