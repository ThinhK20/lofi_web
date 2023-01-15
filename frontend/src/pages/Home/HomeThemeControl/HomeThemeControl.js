import { memo, useEffect, useMemo, useRef, useState } from "react";
import {  images } from "~/assets";
import classNames from "classnames/bind";

import styles from "./HomeThemeControl.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import videoAPI from "~/api/videoAPI";
import VideoComponent from "~/components/layout/components/VideoComponent";
import Loading from "~/pages/Loading";
import audioAPI from "~/api/audioAPI";
import { setCurrentSongId } from "~/components/Redux/generalSlice";
const cx = classNames.bind(styles);

function HomeThemeControl() {
    const [playing, setPlaying] = useState(false);
    const dispatch = useDispatch()
    const {currentSongId} = useSelector((state) => state.general); 

    const {data : videoResponse, isSuccess: isVideoSuccess, isLoading  } = useQuery({
        queryKey: ['videoData'],
        queryFn: () => videoAPI.getVideosFromTopic('chill-vibes'),
        keepPreviousData: true,
        staleTime: Infinity
    })   

    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ["audioWithoutNoiseData"],
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity,
    });     


    const currentSong = useRef()


    const videoData = useMemo(() => { 
        if (isVideoSuccess) { 
            return videoResponse.data.reduce((prev, curr) => {
                return {...prev, [curr.caption]: videoAPI.getVideo(curr.videoName)}
            }, {}) 
        } 
        return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoSuccess])  



    const handlePlaySong = () => { 
        setPlaying(true);
    };

    const handlePauseSong = () => {
        setPlaying(false);
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
        playing ?  currentSong.current?.play() :  currentSong.current?.pause()
    }, [playing, currentSongId]); 

    return (
        <> 
            {isLoading && <Loading/>}
            {isVideoSuccess 
                && 
                <>
                    <VideoComponent srcVideo={videoData['day-sunny']} themeCondition="light" rainCondition={false}/>
                    <VideoComponent srcVideo={videoData['day-rainny']} themeCondition="light" rainCondition={true}/>
                    <VideoComponent srcVideo={videoData['night-clear']} themeCondition="dark" rainCondition={false}/>
                    <VideoComponent srcVideo={videoData['night-rainny']} themeCondition="dark" rainCondition={true}/>
                </>
            }   


            {
                isAudioSuccess &&
                <>  
                    <audio loop  src={audioAPI.renderAudio(audioResponse.data[currentSongId].audioName)} ref={currentSong} />
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
