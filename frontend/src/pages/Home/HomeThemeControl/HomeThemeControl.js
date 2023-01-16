import { memo, useEffect, useRef, useState } from "react";
import {  images } from "~/assets";
import classNames from "classnames/bind";

import styles from "./HomeThemeControl.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import audioAPI from "~/api/audioAPI";
import { setCurrentSongId } from "~/components/Redux/generalSlice";
const cx = classNames.bind(styles);

function HomeThemeControl() {
    const [playing, setPlaying] = useState(false);
    const dispatch = useDispatch()
    const {currentSongId, mutedAudio, audioVolume } = useSelector((state) => state.general);  

 
    const currentSong = useRef(new Audio())

    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ["audioWithoutNoiseData"],
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity,
    });     

    const handlePlaySong = () => { 
        setPlaying(() => true);
    };

    const handlePauseSong = () => {
        setPlaying(() => false);
    };

    const handleNextSong = () => { 
        if (currentSongId >= audioResponse.data.length - 1) {
            dispatch(setCurrentSongId(0))
        } else {
            dispatch(setCurrentSongId(currentSongId + 1))
        }

    };

    const handleBackSong = () => { 
        if (currentSongId === 0) {
            dispatch(setCurrentSongId(audioResponse.data.length - 1))
        }  else {
            dispatch(setCurrentSongId(currentSongId - 1))
        }
    };  

    useEffect(() => {
        if (isAudioSuccess) {
            currentSong.current.src = audioAPI.renderAudio(audioResponse.data[currentSongId].audioName)  
            if (!currentSong.current.loop) currentSong.current.loop = true
            if (playing) {
                currentSong.current.play() 
            } 
        } 
    }, [currentSongId, isAudioSuccess]) 

    useEffect(() => {
        if (playing) { 
            currentSong.current.play()
        } else {
            currentSong.current.pause()
        }
    }, [playing])

    useEffect(() => {
        currentSong.current.muted = mutedAudio 
    }, [mutedAudio]) 

    useEffect(() => {
        currentSong.current.volume = audioVolume
    }, [audioVolume])


    return (
        <> 
            {
                isAudioSuccess &&
                <>  
                    <h1 className={cx("current-song-name__text")}>Song name: {audioResponse.data[currentSongId].caption}</h1>
                </>
            }

            <div className={cx("music-player-control")}>
                <div className={cx("music-btn")} onClick={handleBackSong}>
                    <img src={images.prev} alt="prev-song-btn" />
                </div>
                <div className={cx("music-btn")}>
                    <img
                        src={!playing ? images.play : images.pause}
                        alt="play-song-btn"
                        onClick={!playing ? handlePlaySong : handlePauseSong}
                    />
                </div>
                <div className={cx("music-btn")} onClick={handleNextSong}>
                    <img src={images.next} alt="next-song-btn" />
                </div>
            </div>
        </>
    );
}

export default memo(HomeThemeControl);