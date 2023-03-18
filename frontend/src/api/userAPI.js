import axios from "axios";
const uploadAvatarQuery = "https://lofi-web-api.vercel.app/v1/user/upload/avatar/";
const uploadWallpaperQuery = "https://lofi-web-api.vercel.app/v1/user/upload/wallpaper/";
const updateProfileInfo = "https://lofi-web-api.vercel.app/v1/user/upload/info/";

const userAPI = {
    uploadAvatar: async (data) => {
        const { id, ...dataDTO } = data;
        return await axios.post(uploadAvatarQuery + id, dataDTO, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
    updateProfileInfo: async (data) => {
        const { id, ...dataDTO } = data;
        return await axios.post(updateProfileInfo + id, dataDTO);
    },
    uploadWallpaper: async (data) => {
        const { id, ...dataDTO } = data;
        return await axios.post(uploadWallpaperQuery + id, dataDTO, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

export default userAPI;
