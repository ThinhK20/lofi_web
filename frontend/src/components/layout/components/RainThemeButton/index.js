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
    const { rain } = useSelector((state) => state.general);

    const handleRain = () => {
        dispatch(setRain(!rain));
    };

    return <FontAwesomeIcon icon={faCloudRain} className={cx("wrapper")} onClick={handleRain} />;
}

export default memo(RainThemeButton);
