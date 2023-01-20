import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { memo, useEffect, useState } from "react";

import { images } from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faExpand, faMoon, faShareNodes, faSun, faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { toggleFullScreen } from "./Function";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDateWidget, setMutedAudio, setTheme, updateDate } from "~/components/Redux/generalSlice";
import Tippy from "@tippyjs/react/headless"; // different import path!
import TippyOption from "./TippyOptions/TippyOptions";
import { Link } from "react-router-dom";
import imageAPI from "~/api/imageAPI";

const cx = classNames.bind(styles);
function Header() {
    const user = useSelector(state => state.user) 
    // const user = null
    const {dateState, activeDateWidget, theme, mutedAudio } = useSelector((state) => state.general);
    const [visibleOptions, setVisibleOptions] = useState(false); 

    const dispatch = useDispatch(); 

    const handleOpenDateStatus = () => {
        dispatch(setActiveDateWidget(!activeDateWidget));
    }; 


    const handleTheme = () => {
        dispatch(theme === "dark" ? setTheme("light") : setTheme("dark"));
    };

    const handleShowTippyOptions = () => {
        setVisibleOptions(!visibleOptions);
    };  



    const toggleAudio = () => {
        dispatch(setMutedAudio(!mutedAudio)) 
    }

    useEffect(() => {
        const intervalTimeId = setInterval(() => {
            dispatch(updateDate());
        }, 30000);

        return () => clearInterval(intervalTimeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <header className={cx("wrapper")}>
            <Link to="/" className={cx("logo")} >
                <img src={images.logo} alt="Logo-lofi" />
            </Link>
            <div className={cx("actions")}>
                <div className={cx("time-box")} onClick={handleOpenDateStatus}>
                    <span>
                        {dateState.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                    </span>
                </div>
                <button className={cx("switch-btn", theme === "dark" && "dark")} onClick={handleTheme}>
                    <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} className={cx("switch-icon")} />
                    <span className={cx("slider")} />
                </button>
                {user ? (
                    <Link to="profile" href="." className={cx("user-wrapper")}>
                        <img className={cx("user-avatar")} src={!user.user.service ? imageAPI.getImage(user.user.avatar) : user.user.avatar} alt="user-avatar" />
                    </Link>
                ) : (
                    <>
                        
                        <Link to="login" className={cx("authentication-btn")}>
                            Log in
                        </Link>
                        <Link to="signup" className={cx("authentication-btn")}>
                            Sign up
                        </Link>
                    </>
                )}

                <div className={cx("options")}>
                    <button className={cx("option-btn")}>
                        <FontAwesomeIcon icon={faShareNodes} />
                    </button> 
                   
                    <button className={cx("option-btn")} onClick={toggleAudio}> 
                        {mutedAudio ? 
                            <FontAwesomeIcon icon={faVolumeMute}/>
                            : 
                            <FontAwesomeIcon icon={faVolumeLow} />
                        }
                    </button>
                    <button className={cx("option-btn")} onClick={toggleFullScreen}>
                        <FontAwesomeIcon icon={faExpand} />
                    </button>
                    <Tippy
                        interactive={true}
                        visible={visibleOptions}
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <TippyOption />
                            </div>
                        )}
                    >
                        <button className={cx("option-btn")} onClick={handleShowTippyOptions}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
