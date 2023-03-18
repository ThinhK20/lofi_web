const imageQuery = "https://lofi-web-api.vercel.app/v1/image/";

const imageAPI = {
    getImage: (imageName) => {
        return imageQuery + imageName;
    },
};

export default imageAPI;
