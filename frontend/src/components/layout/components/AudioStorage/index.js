import { useQuery } from "@tanstack/react-query";
import { memo,  useMemo } from "react";
import audioAPI from "~/api/audioAPI";

let audioNoiseData = null;
let audioSongs = null;

const AudioStorage = () => {
    const { data: audioNoiseResponse, isSuccess: isAudioNoiseSuccess } = useQuery({
        queryKey: ["audioNoise"],
        queryFn: () => audioAPI.getAudioFromTopic("audio-noise"),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ["audioWithoutNoiseData"],
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    audioSongs = useMemo(() => {
        if (isAudioSuccess) {
            return audioResponse.data.map((curr) => {
                const newSong = new Audio(audioAPI.renderAudio(curr.audioName));
                newSong.loop = true
                return newSong
            }, []);
        }
        return [];
    }, [isAudioSuccess]);

    audioNoiseData = useMemo(() => {
        if (isAudioNoiseSuccess) {
            return audioNoiseResponse.data.reduce((prev, curr) => {
                return { ...prev, [curr.caption]: (() => {
                    const newAudio =  new Audio(audioAPI.renderAudio(curr.audioName)) 
                    newAudio.loop = true
                    return newAudio
                })() }
            }, {}); 

        }
        return {};
    }, [isAudioNoiseSuccess]);

    return <></>;
};

const useNoise = {
    playNoise: (caption) => {
        if (audioNoiseData) {
            audioNoiseData[caption]?.play();
        }
    },
    pauseNoise: (caption) => {
        if (audioNoiseData) { 
            audioNoiseData[caption]?.pause();
        }
    },
    adjustNoise: (caption, value) => {
        if (audioNoiseData) {
            try {
                audioNoiseData[caption].volume = value;
            } catch (err) {
                console.log(err);
            }
        }
    },
    muteNoise: (caption, value) => {
        if (audioNoiseData) {
            try {
                audioNoiseData[caption].muted = value;
            } catch (err) {
                console.log(err);
            }
        }
    }, 
};

const useSongs = {
    playSong: (index) => {
        if (audioSongs) {
            audioSongs[index]?.play();
        }
    },
    pauseSong: (index) => {
        if (audioSongs) {
            audioSongs[index]?.pause();
        }
    },
    adjustVolume: (index, value) => {
        if (audioSongs) {
            audioSongs[index].volume = value;
        }
    },
    muteVolume: (index, value) => {
        if (audioSongs) {
            audioSongs[index].muted = value;
        }
    },
    getSong: (index) => {
        if (audioSongs) {
            return audioSongs[index];
        }
    }, 
    getLength: () => {
        return audioSongs.length
    },
    audioSongs
};

export { useNoise, useSongs };

export default memo(AudioStorage);
