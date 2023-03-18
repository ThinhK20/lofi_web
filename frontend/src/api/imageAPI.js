const imageQuery = "https://lofi-chill-api.onrender.com/v1/image/";

const imageAPI = {
    getImage: (imageName) => {
        return imageQuery + imageName;
    },
};

export default imageAPI;
