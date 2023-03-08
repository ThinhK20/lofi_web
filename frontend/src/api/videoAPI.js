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
    getVideo: async (videoName, updateProgress) => {
        const videos = await axios.get(getVideoQuery + videoName, {
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentage = Math.floor((loaded * 100) / total);
                updateProgress(percentage);
            },
        });
        if (videos) return videos.data;
    },
};

export default videoAPI;
