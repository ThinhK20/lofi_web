const imageQuery = "http://localhost:8000/v1/image/"


const imageAPI = {
    getImage: (imageName) => {
        return imageQuery + imageName
    }
}

export default imageAPI