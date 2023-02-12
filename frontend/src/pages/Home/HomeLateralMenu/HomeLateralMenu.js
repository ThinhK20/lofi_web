/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./HomeLateralMenu.module.scss";
import classNames from "classnames/bind";
import { Slider } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCirclePlay,
    faGuitar,
    faImage,
    faLock,
    faMoon,
    faMugHot,
    faMusic,
    faSliders,
    faVolumeHigh,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { images } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScenes, setCurrentSongId, setMutedAudio, setVolume } from "~/components/Redux/generalSlice";
import { useQuery } from "@tanstack/react-query";
import audioAPI from "~/api/audioAPI";
import { updateNoiseStorage } from "~/components/Redux/audioSlice";

const cx = classNames.bind(styles);

function HomeLateralMenu() {
    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ["audioWithoutNoiseData"],
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const { audioNoises } = useSelector((state) => state.audioStorage);

    const { data: audioNoiseResponse, isSuccess: isAudioNoiseSuccess } = useQuery({
        queryKey: ["audioNoiseData"],
        queryFn: () => audioAPI.getAudioFromTopic("audio-noise"),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const optionsElement = useRef();
    const [tippyIndexs, setTippyIndexs] = useState([false, false, false, false]);
    const dispatch = useDispatch();
    const { mutedAudio, currentSongId, rain, currentScenes } = useSelector((state) => state.general);

    const handleNoise = (e, index) => {
        const value = e.target.value / 100;
        audioNoises[index].audio.volume = value;
        if (value === 0) {
            audioNoises[index].audio.pause();
        } else {
            audioNoises[index].audio.play();
        }
    };

    const handleShowMenu = (e) => {
        let eTarget = e.target;
        const optionsArr = optionsElement.current.childNodes;
        if (!eTarget.classList.contains("panel-btn")) {
            eTarget = eTarget.closest(".panel-btn");
        }

        if (eTarget.classList.contains("active")) {
            setTippyIndexs((oldState) => {
                return oldState.map((state) => (state = false));
            });
            eTarget.classList.remove("active");
        } else {
            optionsArr.forEach((option, index) => {
                if (option.classList.contains("active")) {
                    option.classList.remove("active");
                }
                if (option === eTarget) {
                    setTippyIndexs((oldState) => {
                        return oldState.map((state, id) => {
                            if (id === index) {
                                state = true;
                            } else state = false;
                            return state;
                        });
                    });
                }
            });
            eTarget.classList.add("active");
        }
    };

    const handleActiveMoodBtn = (e) => {
        let eTarget = e.target;
        const moodBoxBtn = e.target.closest(".mood-box-btn-temp");
        if (!eTarget.classList.contains("mood-btn")) {
            eTarget = eTarget.closest(".mood-btn-temp");
        }

        moodBoxBtn.childNodes.forEach((moodBtn) => {
            if (moodBtn.classList.contains("active")) {
                moodBtn.classList.remove("active");
            }
        });
        eTarget.classList.add("active");
    };

    const handleSelectedSong = (index) => {
        dispatch(setCurrentSongId(index));
    };

    useEffect(() => {
        if (isAudioNoiseSuccess) {
            const rainNoise = audioNoises.find((x) => x.caption === "rain-city")?.audio;
            if (rain) {
                if (rainNoise) {
                    rainNoise.volume = 1;
                    rainNoise?.play();
                }
            } else {
                if (rainNoise) {
                    rainNoise?.pause();
                }
            }
        }
    }, [rain]);

    useEffect(() => {
        if (isAudioNoiseSuccess) {
            audioNoises.forEach((noise) => {
                noise.audio.muted = mutedAudio;
            });
        }
    }, [mutedAudio]);

    useEffect(() => {
        if (isAudioNoiseSuccess && audioNoises.length === 0) {
            dispatch(
                updateNoiseStorage(
                    audioNoiseResponse.data.map((noise) => {
                        return {
                            ...noise,
                            name: noise.caption
                                .split("-")
                                .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
                                .join(" "),
                            audio: (() => {
                                const newAudio = new Audio(audioAPI.renderAudio(noise.audioName));
                                newAudio.loop = true;
                                return newAudio;
                            })(),
                        };
                    }),
                ),
            );
        }
    }, [isAudioNoiseSuccess]);

    useEffect(() => {
        return () => {
            if (isAudioNoiseSuccess) {
                audioNoises.forEach((noise) => {
                    noise.audio.pause();
                });
            }
        };
    }, []);

    const handleScenes = (event) => {
        const value = event.target.getAttribute("value");
        if (currentScenes !== value) {
            dispatch(setCurrentScenes(value));
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("options")} ref={optionsElement}>
                <Tippy
                    appendTo={document.body}
                    interactive={true}
                    visible={tippyIndexs[0]}
                    render={(attrs) => (
                        <div className={`wrapper-panel ${cx("options-tippy")}`} tabIndex={-1} {...attrs}>
                            <div className={cx("options-tippy-wrapper")}>
                                <div className={cx("tippy-title", "tippy-item")}>
                                    <h3 className={cx("tippy-title-text")}>Mood</h3>
                                    <img className={cx("tippy-title-img")} src={images.lofi} alt="lofi-svg" />
                                </div>
                                <div className={`${cx("mood-box-btn")} mood-box-btn-temp`}>
                                    <div className={`${cx("mood-btn")} mood-btn-temp`} onClick={handleActiveMoodBtn}>
                                        <FontAwesomeIcon className={cx("mood-btn-icon")} icon={faMoon} />
                                        <span className={cx("mood-btn-text")}>Sleepy</span>
                                    </div>
                                    <div className={`${cx("mood-btn")} mood-btn-temp`} onClick={handleActiveMoodBtn}>
                                        <FontAwesomeIcon className={cx("mood-btn-icon")} icon={faGuitar} />
                                        <span className={cx("mood-btn-text")}>Jazzy</span>
                                    </div>
                                    <div
                                        className={`${cx("mood-btn")} mood-btn-temp active`}
                                        onClick={handleActiveMoodBtn}
                                    >
                                        <FontAwesomeIcon className={cx("mood-btn-icon")} icon={faMugHot} />
                                        <span className={cx("mood-btn-text")}>Chill</span>
                                    </div>
                                </div>
                                <div className={cx("mood-main-audio")}>
                                    {mutedAudio ? (
                                        <FontAwesomeIcon
                                            onClick={() => dispatch(setMutedAudio(false))}
                                            className={cx("mood-main-audio-icon")}
                                            icon={faVolumeMute}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={() => dispatch(setMutedAudio(true))}
                                            className={cx("mood-main-audio-icon")}
                                            icon={faVolumeHigh}
                                        />
                                    )}
                                    <Slider
                                        className={cx("mood-main-audio-slider")}
                                        valueLabelDisplay="auto"
                                        onChange={(e) => {
                                            dispatch(setVolume(e.target.value / 100));
                                        }}
                                        min={0}
                                        max={100}
                                        defaultValue={100}
                                    />
                                </div>
                                <div className={cx("tippy-title", "tippy-item")}>
                                    <h3 className={cx("tippy-title-text")}>Sounds</h3>
                                </div>
                                <div className={cx("noise-sound-box")}>
                                    {isAudioNoiseSuccess &&
                                        audioNoises.map((noise, index) => {
                                            return (
                                                <div className={cx("noise-sound-item")} key={index}>
                                                    <span className={cx("noise-sound-name")}>{noise.name}</span>
                                                    {noise.caption === "rain-city" ? (
                                                        <>
                                                            {rain ? (
                                                                <Slider
                                                                    valueLabelDisplay="auto"
                                                                    min={0}
                                                                    max={100}
                                                                    defaultValue={100}
                                                                    onChange={(e) => handleNoise(e, index)}
                                                                    className={cx("noise-sound-slider")}
                                                                />
                                                            ) : (
                                                                <>
                                                                    <span>{rain}</span>
                                                                    <Slider
                                                                        valueLabelDisplay="auto"
                                                                        min={0}
                                                                        max={100}
                                                                        defaultValue={0}
                                                                        onChange={(e) => handleNoise(e, index)}
                                                                        className={cx("noise-sound-slider")}
                                                                    />
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <Slider
                                                            valueLabelDisplay="auto"
                                                            min={0}
                                                            max={100}
                                                            defaultValue={0}
                                                            onChange={(e) => handleNoise(e, index)}
                                                            className={cx("noise-sound-slider")}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className={cx("footer")}>
                                <h4 className={cx("footer-text")}>Mix Mode</h4>
                            </div>
                        </div>
                    )}
                >
                    <div className={`panel-btn ${cx("options-item")}`} onClick={handleShowMenu}>
                        <FontAwesomeIcon icon={faSliders} className={cx("options-icon")} />
                    </div>
                </Tippy>

                <Tippy
                    appendTo={document.body}
                    interactive={true}
                    visible={tippyIndexs[1]}
                    render={(attrs) => (
                        <div className={`wrapper-panel  ${cx("options-tippy")}`} tabIndex={-1} {...attrs}>
                            <div className={cx("options-tippy-wrapper")}>
                                <div className={cx("tippy-title", "tippy-item")}>
                                    <h3 className={cx("tippy-title-text")}>Playlists</h3>
                                </div>
                                <div className={cx("templates-panel")}>
                                    <img
                                        src={images.playlists_template1}
                                        className={cx("template-img")}
                                        alt="templates-panel"
                                    />
                                    <img
                                        src={images.playlists_template2}
                                        className={cx("template-img")}
                                        alt="templates-panel"
                                    />
                                    <img
                                        src={images.playlists_template3}
                                        className={cx("template-img")}
                                        alt="templates-panel"
                                    />
                                </div>
                                <div className={cx("tippy-title", "tippy-item")} style={{ padding: "10px 0" }}>
                                    <h3 className={cx("tippy-title-text")}>
                                        Songs
                                        <div className={cx("hidden-scroll")} style={{ height: "250px" }}>
                                            {isAudioSuccess &&
                                                audioResponse.data.map((obj, index) => {
                                                    if (index === currentSongId) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={cx("tippy-song-card", "active")}
                                                            >
                                                                <h1 className={cx("tippy-song-title")}>
                                                                    {obj.caption}
                                                                </h1>
                                                                <FontAwesomeIcon
                                                                    className={cx("tippy-song-play-icon")}
                                                                    icon={faCirclePlay}
                                                                />
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={cx("tippy-song-card")}
                                                                onClick={() => handleSelectedSong(index)}
                                                            >
                                                                <h1 className={cx("tippy-song-title")}>
                                                                    {obj.caption}
                                                                </h1>
                                                                <FontAwesomeIcon
                                                                    className={cx("tippy-song-play-icon")}
                                                                    icon={faCirclePlay}
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                })}
                                        </div>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <div className={`panel-btn ${cx("options-item")}`} onClick={handleShowMenu}>
                        <FontAwesomeIcon icon={faMusic} className={cx("options-icon")} />
                    </div>
                </Tippy>
                <Tippy
                    appendTo={document.body}
                    interactive={true}
                    visible={tippyIndexs[2]}
                    render={(attrs) => (
                        <div
                            className={`wrapper-panel  ${cx("options-tippy", "scenes-tippy")}`}
                            tabIndex={-1}
                            {...attrs}
                        >
                            <div className={cx("options-tippy-wrapper", "scenes-tippy-wrapper")}>
                                <div className={cx("tippy-title", "tippy-item")}>
                                    <h3 className={cx("tippy-title-text")}>Scenes</h3>
                                </div>
                                <div className={cx("scenes")}>
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_chillVipe}
                                        alt="scenes-background"
                                        onClick={handleScenes}
                                        value="chill-vibes"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_seoul}
                                        alt="scenes-background"
                                        onClick={handleScenes}
                                        value="seoul-city"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_seoul_cafe}
                                        alt="scenes-background"
                                        onClick={handleScenes}
                                        value="seoul-cafe"
                                    />
                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_amidreaming}
                                            alt="scenes-background"
                                        />
                                    </div>
                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_cafe}
                                            alt="scenes-background"
                                        />
                                    </div>
                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_honolulu}
                                            alt="scenes-background"
                                        />
                                    </div>

                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_lofiCaffe}
                                            alt="scenes-background"
                                        />
                                    </div>
                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_lofiDesk}
                                            alt="scenes-background"
                                        />
                                    </div>

                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_springLake}
                                            alt="scenes-background"
                                        />
                                    </div>

                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_northenLake}
                                            alt="scenes-background"
                                        />
                                    </div>

                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_summerDay}
                                            alt="scenes-background"
                                        />
                                    </div>

                                    <div className={cx("scene-overlay__update-soon")}>
                                        <FontAwesomeIcon className={cx("scene-overlay__keyhole")} icon={faLock} />
                                        <img
                                            className={cx("scene-background")}
                                            src={images.scenes_background_vanLife}
                                            alt="scenes-background"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <div className={`panel-btn ${cx("options-item")}`} onClick={handleShowMenu}>
                        <FontAwesomeIcon icon={faImage} className={cx("options-icon")} />
                    </div>
                </Tippy>
                <div className={`panel-btn ${cx("options-item")}`} onClick={handleShowMenu}>
                    <FontAwesomeIcon icon={faBookOpen} className={cx("options-icon")} />
                </div>
            </div>
        </div>
    );
}

export default memo(HomeLateralMenu);
