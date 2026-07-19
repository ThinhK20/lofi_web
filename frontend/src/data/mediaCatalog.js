const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const toTitleCase = (value) =>
    value
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export const LOFI_TRACKS = [
    "chill1",
    "chill2",
    "chill3",
    "jazz1",
    "jazz2",
    "jazz3",
    "sleepy1",
    "sleepy2",
    "sleepy3",
    "sleepy4",
].map((id) => ({
    id,
    caption: id.replace(/(\D)(\d)/, "$1 $2").replace(/^\w/, (letter) => letter.toUpperCase()),
    src: publicAsset(`lofi/${id}.mp3`),
}));

export const AMBIENT_SOUNDS = [
    "birds",
    "campfire",
    "city_traffic",
    "fan",
    "fireplace",
    "forest_night",
    "ocean",
    "people_talk_inside",
    "rain_city",
    "rain_forest",
    "river",
    "snow",
    "summer_storm",
    "waves",
    "wind",
].map((fileName) => {
    const id = fileName.replace(/_/g, "-");

    return {
        id,
        caption: toTitleCase(fileName),
        src: publicAsset(`musics/${fileName}.mp3`),
    };
});

export const getBackgroundVideo = ({ theme, rain }) => {
    if (theme === "dark") {
        return publicAsset(rain ? "video/Night-rainny.mp4" : "video/Night-clear.mp4");
    }

    return publicAsset(rain ? "video/Day-rainny.mp4" : "video/Day-sunny.mp4");
};
