/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef, useState } from "react";
import { images } from "~/assets";
import classNames from "classnames/bind";

import styles from "./HomeThemeControl.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import audioAPI from "~/api/audioAPI";
import { setCurrentSongId } from "~/components/Redux/generalSlice";
import { updateSongStorage } from "~/components/Redux/audioSlice";
const cx = classNames.bind(styles);

function HomeThemeControl() {
    const [playing, setPlaying] = useState(false);
    const dispatch = useDispatch();
    const { currentSongId, mutedAudio, audioVolume } = useSelector((state) => state.general);
    const { audioSongs } = useSelector((state) => state.audioStorage);

    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ["audioWithoutNoiseData"],
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const audios = useRef([]);

    useEffect(() => {
        console.log(audioResponse);
    });

    useEffect(() => {
        if (audios.current.length <= 0) {
            audios.current = audioSongs.map((song) => {
                const newAudio = new Audio(song.audio);
                newAudio.loop = true;
                return newAudio;
            });
        }
    }, [audioSongs]);

    const handlePlaySong = () => {
        setPlaying(() => true);
    };

    const handlePauseSong = () => {
        setPlaying(() => false);
    };

    const handleNextSong = () => {
        if (currentSongId >= audioResponse.data.length - 1) {
            dispatch(setCurrentSongId(0));
        } else {
            dispatch(setCurrentSongId(currentSongId + 1));
        }
    };

    const handleBackSong = () => {
        if (currentSongId === 0) {
            dispatch(setCurrentSongId(audioResponse.data.length - 1));
        } else {
            dispatch(setCurrentSongId(currentSongId - 1));
        }
    };

    // when the user clicked next or prev song
    useEffect(() => {
        if (playing) {
            audios.current?.forEach((song, id) => {
                if (id === currentSongId) {
                    song?.play();
                } else {
                    song?.pause();
                }
            });
        }
    }, [currentSongId]);

    useEffect(() => {
        if (playing) {
            audios.current[currentSongId]?.play();
        } else {
            audios.current[currentSongId]?.pause();
        }
    }, [playing]);

    useEffect(() => {
        if (audios && audios.current) {
            audios.current?.forEach((song) => {
                if (song) {
                    song.muted = mutedAudio;
                }
            });
        }
    }, [mutedAudio]);

    useEffect(() => {
        if (audios) {
            audios?.current?.forEach((song) => {
                if (song) {
                    song.volume = audioVolume;
                }
            });
        }
    }, [audioVolume]);

    useEffect(() => {
        if (isAudioSuccess && audioSongs.length === 0) {
            dispatch(
                updateSongStorage(
                    audioResponse.data.map((song) => {
                        return {
                            ...song,
                            audio: (() => {
                                const newAudio = audioAPI.renderAudio(song.audioName);
                                return newAudio;
                            })(),
                        };
                    }),
                ),
            );
        }
    }, [isAudioSuccess]);

    return (
        <>
            {isAudioSuccess && (
                <>
                    <h1 className={cx("current-song-name__text")}>
                        Song name: {audioResponse.data[currentSongId].caption}
                    </h1>
                </>
            )}

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
