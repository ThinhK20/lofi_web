import axios from "axios"
const uploadAvatarQuery = "http://localhost:8000/v1/user/upload/avatar/" 
const uploadWallpaperQuery = "http://localhost:8000/v1/user/upload/wallpaper/" 
const updateProfileInfo = "http://localhost:8000/v1/user/upload/info/" 

const userAPI = { 
    uploadAvatar: async(data) => {
        const {id, ...dataDTO} = data
        return await axios.post(uploadAvatarQuery + id, dataDTO, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
    },
    updateProfileInfo: async(data) => {
        const {id, ...dataDTO} = data
        return await axios.post(updateProfileInfo + id, dataDTO)
    },
    uploadWallpaper: async(data) => {
        const {id, ...dataDTO} = data
        return await axios.post(uploadWallpaperQuery + id, dataDTO, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
    },
 
}

export default userAPI