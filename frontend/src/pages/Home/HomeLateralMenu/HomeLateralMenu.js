import styles from "./HomeLateralMenu.module.scss";
import classNames from "classnames/bind";
import { Slider } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCirclePlay,
    faGuitar,
    faImage,
    faMoon,
    faMugHot,
    faMusic,
    faSliders,
    faVolumeHigh,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { images } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongId, setMutedAudio, setVolume } from "~/components/Redux/generalSlice";
import { useQuery } from "@tanstack/react-query";
import audioAPI from "~/api/audioAPI";

const cx = classNames.bind(styles);

function HomeLateralMenu() {
    const { data: audioResponse, isSuccess: isAudioSuccess } = useQuery({
        queryKey: ['audioWithouNoiseData'], 
        queryFn: () => audioAPI.getAllAudioWithoutNoise(),
        keepPreviousData: true,
        staleTime: Infinity
    })   



    const optionsElement = useRef(); 
    const [tippyIndexs, setTippyIndexs] = useState([false, false, false, false]); 
    const dispatch = useDispatch() 
    const { mutedAudio, currentSongId } = useSelector(state => state.general) 


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
        dispatch(setCurrentSongId(index))
    }

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
                                    {mutedAudio ? 
                                    <FontAwesomeIcon onClick={() => dispatch(setMutedAudio(false))} className={cx("mood-main-audio-icon")} icon={faVolumeMute} />
                                    :
                                    <FontAwesomeIcon onClick={() => dispatch(setMutedAudio(true))} className={cx("mood-main-audio-icon")} icon={faVolumeHigh} />
                                    
                                    }
                                    <Slider
                                        className={cx("mood-main-audio-slider")}
                                        valueLabelDisplay="auto"  
                                        onChange={(e) => {
                                            dispatch(setVolume(e.target.value / 100)) 
                                        } }
                                        min={0}
                                        max={100}
                                        defaultValue={100}
                                    />
                                </div>
                                <div className={cx("tippy-title", "tippy-item")}>
                                    <h3 className={cx("tippy-title-text")}>Sounds</h3>
                                </div>
                                <div className={cx("noise-sound-box")}>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Keyboard</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Summer Storm</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Ocean</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Campfire</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Forest</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Forest Rain</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Waves</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Fan</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>City Traffic</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>City Rain</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>River</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>People Talking</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
                                    <div className={cx("noise-sound-item")}>
                                        <span className={cx("noise-sound-name")}>Wind</span>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            defaultValue={0}
                                            className={cx("noise-sound-slider")}
                                        />
                                    </div>
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
                                <div className={cx("tippy-title", "tippy-item")} style={{padding: "10px 0"}} >
                                    <h3 className={cx("tippy-title-text")}>
                                        Songs
                                        <div className={cx('hidden-scroll')}  style={{height: "250px"}}>
                                            {isAudioSuccess && audioResponse.data.map((obj, index)  => {  

                                                if (index === currentSongId) {
                                                    return ( 
                                                        <div key={index}  className={cx('tippy-song-card', 'active')}>
                                                            <h1 className={cx('tippy-song-title')} >{obj.caption}</h1>  
                                                            <FontAwesomeIcon className={cx('tippy-song-play-icon')} icon={faCirclePlay} />
                                                        </div>
                                                    )
                                                } else {
                                                    return ( 
                                                        <div key={index}  className={cx('tippy-song-card')} onClick={() => handleSelectedSong(index)}>
                                                            <h1 className={cx('tippy-song-title')} >{obj.caption}</h1>  
                                                            <FontAwesomeIcon className={cx('tippy-song-play-icon')} icon={faCirclePlay} />
                                                        </div>
                                                    )
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
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_amidreaming}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_cafe}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_honolulu}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_lofiCaffe}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_lofiDesk}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_springLake}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_northenLake}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_summerDay}
                                        alt="scenes-background"
                                    />
                                    <img
                                        className={cx("scene-background")}
                                        src={images.scenes_background_vanLife}
                                        alt="scenes-background"
                                    />
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
