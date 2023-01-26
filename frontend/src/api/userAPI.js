import axios from "axios"
const uploadAvatarQuery = "http://localhost:8000/v1/user/upload/avatar/" 

const userAPI = { 
    uploadAvatar: async(data) => {
        const {id, ...dataDTO} = data
        return await axios.post(uploadAvatarQuery + id, dataDTO, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
    },
 
}

export default userAPI