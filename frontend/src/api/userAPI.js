import axios from "axios"
const uploadAvatarQuery = "http://localhost:8000/v1/user/upload/avatar/" 
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
    }
 
}

export default userAPI