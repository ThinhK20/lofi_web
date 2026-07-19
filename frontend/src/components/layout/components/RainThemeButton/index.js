import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRain } from "~/components/Redux/generalSlice";
import styles from "./RainThemeButton.module.scss";

const cx = classNames.bind(styles);
function RainThemeButton() {
    const dispatch = useDispatch();
    const { rain, theme } = useSelector((state) => state.general);

    const handleRain = () => {
        dispatch(setRain(!rain));
    };

    return (
        <button
            type="button"
            className={cx("wrapper", `theme-${theme}`, rain && "active")}
            onClick={handleRain}
            aria-label={rain ? "Turn rain off" : "Turn rain on"}
            aria-pressed={rain}
        >
            <FontAwesomeIcon icon={faCloudRain} className={cx("icon")} />
        </button>
    );
}

export default memo(RainThemeButton);
