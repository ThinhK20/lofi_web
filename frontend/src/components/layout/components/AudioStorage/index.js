import { useQuery } from "@tanstack/react-query";
import { memo,  useMemo } from "react";
import audioAPI from "~/api/audioAPI";

let audioNoiseData = null;
let songs = null;

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

    songs = useMemo(() => {
        if (isAudioSuccess) {
            return audioResponse.data.map((curr) => {
                return new Audio(audioAPI.renderAudio(curr.audioName));
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
        if (songs) {
            songs[index]?.play();
        }
    },
    pauseSong: (index) => {
        if (songs) {
            songs[index]?.pause();
        }
    },
    adjustVolume: (index, value) => {
        if (songs) {
            songs[index].volume = value;
        }
    },
    muteVolume: (index, value) => {
        if (songs) {
            songs[index].muted = value;
        }
    },
    getSong: (index) => {
        if (songs) {
            return songs[index];
        }
    }, 
    getLength: () => {
        return songs.length
    }
};

export { useNoise, useSongs };

export default memo(AudioStorage);
