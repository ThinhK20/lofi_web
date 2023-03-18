import axios from "axios";

const uploadQuery = "https://lofi-web-api.vercel.app/v1/video/upload";
const getVideosQuery = "https://lofi-web-api.vercel.app/v1/video/topic/";
const getVideoQuery = "https://lofi-web-api.vercel.app/v1/video/";

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
