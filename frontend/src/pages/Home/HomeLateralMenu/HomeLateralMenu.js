import styles from "./HomeLateralMenu.module.scss";
import classNames from "classnames/bind";
import { Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCirclePause,
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
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { images } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongId, setMutedAudio, setVolume } from "~/components/Redux/generalSlice";
import { AMBIENT_SOUNDS, LOFI_TRACKS } from "~/data/mediaCatalog";

const cx = classNames.bind(styles);
const moods = [
    { id: "sleepy", icon: faMoon, label: "Sleepy" },
    { id: "jazz", icon: faGuitar, label: "Jazzy" },
    { id: "chill", icon: faMugHot, label: "Chill" },
];

function HomeLateralMenu() {
    const dispatch = useDispatch();
    const { mutedAudio, currentSongId, rain, theme } = useSelector((state) => state.general);
    const [activePanel, setActivePanel] = useState(null);
    const [activeMood, setActiveMood] = useState("chill");
    const [noiseVolumes, setNoiseVolumes] = useState({ "rain-city": 0 });
    const noiseAudios = useRef(new Map());

    useEffect(() => {
        noiseAudios.current = new Map(
            AMBIENT_SOUNDS.map(({ id, src }) => {
                const audio = new Audio(src);
                audio.loop = true;
                return [id, audio];
            }),
        );

        return () => {
            noiseAudios.current.forEach((audio) => {
                audio.pause();
                audio.src = "";
            });
            noiseAudios.current.clear();
        };
    }, []);

    useEffect(() => {
        noiseAudios.current.forEach((audio) => {
            audio.muted = mutedAudio;
        });
    }, [mutedAudio]);

    const setNoiseVolume = useCallback((id, value) => {
        const percentage = Array.isArray(value) ? value[0] : value;
        const audio = noiseAudios.current.get(id);

        setNoiseVolumes((current) => ({ ...current, [id]: percentage }));
        if (!audio) return;

        audio.volume = percentage / 100;
        if (percentage === 0) {
            audio.pause();
        } else {
            audio.play().catch(() => undefined);
        }
    }, []);

    useEffect(() => {
        setNoiseVolume("rain-city", rain ? 100 : 0);
    }, [rain, setNoiseVolume]);

    const selectMood = (mood) => {
        setActiveMood(mood);
        const firstTrack = LOFI_TRACKS.findIndex((track) => track.id.startsWith(mood));
        dispatch(setCurrentSongId(firstTrack));
    };

    const togglePanel = (panel) => {
        setActivePanel((current) => (current === panel ? null : panel));
    };

    const renderSettings = (attrs) => (
        <div className={`wrapper-panel ${cx("options-tippy", `theme-${theme}`)}`} tabIndex={-1} {...attrs}>
            <div className={cx("options-tippy-wrapper")}>
                <div className={cx("tippy-title", "tippy-item")}>
                    <h3 className={cx("tippy-title-text")}>Mood</h3>
                    <img className={cx("tippy-title-img")} src={images.lofi} alt="" />
                </div>
                <div className={cx("mood-box-btn")}>
                    {moods.map((mood) => (
                        <button
                            type="button"
                            key={mood.id}
                            className={cx("mood-btn", activeMood === mood.id && "active")}
                            onClick={() => selectMood(mood.id)}
                        >
                            <FontAwesomeIcon className={cx("mood-btn-icon")} icon={mood.icon} />
                            <span className={cx("mood-btn-text")}>{mood.label}</span>
                        </button>
                    ))}
                </div>
                <div className={cx("mood-main-audio")}>
                    <button type="button" onClick={() => dispatch(setMutedAudio(!mutedAudio))}>
                        <FontAwesomeIcon className={cx("mood-main-audio-icon")} icon={mutedAudio ? faVolumeMute : faVolumeHigh} />
                    </button>
                    <Slider
                        className={cx("mood-main-audio-slider")}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => dispatch(setVolume((Array.isArray(value) ? value[0] : value) / 100))}
                        min={0}
                        max={100}
                        defaultValue={100}
                    />
                </div>
                <div className={cx("tippy-title", "tippy-item")}><h3 className={cx("tippy-title-text")}>Sounds</h3></div>
                <div className={cx("noise-sound-box")}>
                    {AMBIENT_SOUNDS.map((noise) => (
                        <div className={cx("noise-sound-item")} key={noise.id}>
                            <span className={cx("noise-sound-name")}>{noise.caption}</span>
                            <Slider
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                value={noiseVolumes[noise.id] ?? 0}
                                onChange={(_, value) => setNoiseVolume(noise.id, value)}
                                className={cx("noise-sound-slider")}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx("footer")}><h4 className={cx("footer-text")}>Mix Mode</h4></div>
        </div>
    );

    return (
        <div className={cx("wrapper", `theme-${theme}`)}>
            <div className={cx("options")}>
                <Tippy appendTo={document.body} interactive visible={activePanel === "settings"} render={renderSettings}>
                    <button type="button" className={`panel-btn ${cx("options-item")}`} onClick={() => togglePanel("settings")} aria-label="Sound settings">
                        <FontAwesomeIcon className={cx("options-icon")} icon={faSliders} />
                    </button>
                </Tippy>
                <Tippy
                    appendTo={document.body}
                    interactive
                    visible={activePanel === "songs"}
                    render={(attrs) => (
                        <div className={`wrapper-panel ${cx("options-tippy", `theme-${theme}`)}`} tabIndex={-1} {...attrs}>
                            <div className={cx("options-tippy-wrapper")}>
                                <div className={cx("tippy-title", "tippy-item")}><h3 className={cx("tippy-title-text")}>Songs</h3></div>
                                <div className={cx("hidden-scroll")} style={{ minHeight: "200px" }}>
                                    {LOFI_TRACKS.map((track, index) => (
                                        <button
                                            type="button"
                                            key={track.id}
                                            className={cx("tippy-song-card", index === currentSongId && "active")}
                                            onClick={() => dispatch(setCurrentSongId(index))}
                                        >
                                            <span className={cx("tippy-song-title")}>{track.caption}</span>
                                            <FontAwesomeIcon className={cx("tippy-song-play-icon")} icon={index === currentSongId ? faCirclePause : faCirclePlay} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <button type="button" className={`panel-btn ${cx("options-item")}`} onClick={() => togglePanel("songs")} aria-label="Song list">
                        <FontAwesomeIcon className={cx("options-icon")} icon={faMusic} />
                    </button>
                </Tippy>
                <Tippy
                    appendTo={document.body}
                    interactive
                    visible={activePanel === "scenes"}
                    render={(attrs) => (
                        <div className={`wrapper-panel ${cx("options-tippy", "scenes-tippy", `theme-${theme}`)}`} tabIndex={-1} {...attrs}>
                            <div className={cx("options-tippy-wrapper", "scenes-tippy-wrapper")}>
                                <div className={cx("tippy-title", "tippy-item")}><h3 className={cx("tippy-title-text")}>Scenes</h3></div>
                                <div className={cx("scenes")}>
                                    <img className={cx("scene-background")} src={images.scenes_background_chillVipe} alt="Chill Vibes" />
                                    <div className={cx("scene-locked")}>
                                        <img className={cx("scene-background")} src={images.scenes_background_seoul} alt="Seoul City — in progress" />
                                        <div className={cx("scene-locked-overlay")} aria-hidden="true">
                                            <FontAwesomeIcon className={cx("scene-locked-icon")} icon={faLock} />
                                            <span>In progress...</span>
                                        </div>
                                    </div>
                                    <div className={cx("scene-locked")}>
                                        <img className={cx("scene-background")} src={images.scenes_background_seoul_cafe} alt="Seoul Cafe — in progress" />
                                        <div className={cx("scene-locked-overlay")} aria-hidden="true">
                                            <FontAwesomeIcon className={cx("scene-locked-icon")} icon={faLock} />
                                            <span>In progress...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <button type="button" className={`panel-btn ${cx("options-item")}`} onClick={() => togglePanel("scenes")} aria-label="Scenes">
                        <FontAwesomeIcon className={cx("options-icon")} icon={faImage} />
                    </button>
                </Tippy>
                <a className={`panel-btn ${cx("options-item")}`} href="/how-it-works" aria-label="How it works">
                    <FontAwesomeIcon className={cx("options-icon")} icon={faBookOpen} />
                </a>
            </div>
        </div>
    );
}

export default memo(HomeLateralMenu);
