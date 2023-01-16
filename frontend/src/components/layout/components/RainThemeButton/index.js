import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import audioAPI from "~/api/audioAPI";
import { setRain } from "~/components/Redux/generalSlice";
import styles from "./RainThemeButton.module.scss";

const cx = classNames.bind(styles);
function RainThemeButton() {
    const dispatch = useDispatch();
    const {rain, mutedAudio, rainVolume} = useSelector((state) => state.general);
    const audioRef = useRef(new Audio())

    const { data, isSuccess  } = useQuery({
        queryKey: ['audioNoiseData'],
        queryFn: () => audioAPI.getAudioFromTopic('audio-noise'),
        keepPreviousData: true,
        staleTime: Infinity
    })  

    const handleRain = () => { 
        if (!audioRef.current.src) { 
            if (isSuccess) {
                audioRef.current.src = audioAPI.renderAudio(data.data.find(x => x.caption === 'rain-city').audioName)
                audioRef.current.loop = true
            }
        }
        dispatch(setRain(!rain));
        if (isSuccess) {
            if (rain) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
        }  
    };
    
    useEffect(() => {
        audioRef.current.muted = mutedAudio
    }, [mutedAudio]) 

    useEffect(() => {
        audioRef.current.volume = rainVolume
    }, [rainVolume])
    
    
    return <FontAwesomeIcon icon={faCloudRain} className={cx("wrapper")} onClick={handleRain} />;
}

export default memo(RainThemeButton);
