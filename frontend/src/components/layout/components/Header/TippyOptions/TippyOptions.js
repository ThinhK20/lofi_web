import {
    faDollarSign,
    faExclamationCircle,
    faGear,
    faMessage,
    faMusic,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { setUserData } from "~/components/Redux/userSlice";
import styles from "./TippyOptions.module.scss";

const cx = classNames.bind(styles);

function TippyOption() { 
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(setUserData(null))
    }


    return (
        <div className={cx("wrapper")}>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faDollarSign} className={cx("icon")} />
                <h4 className={cx("name")}>Pricing</h4>
            </a>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faGear} className={cx("icon")} />
                <h4 className={cx("name")}>General settings</h4>
            </a>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faMessage} className={cx("icon")} />
                <h4 className={cx("name")}>Contact us</h4>
            </a>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faGear} className={cx("icon")} />
                <h4 className={cx("name")}>How it works</h4>
            </a>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faMusic} className={cx("icon")} />
                <h4 className={cx("name")}>Submit music</h4>
            </a>
            <a href="/" className={cx("item")}>
                <FontAwesomeIcon icon={faExclamationCircle} className={cx("icon")} />
                <h4 className={cx("name")}>About us</h4>
            </a>
            <a href="/" onClick={handleLogout}  className={cx("item")} >
                <FontAwesomeIcon icon={faRightToBracket} className={cx("icon")} />
                <h4 className={cx("name")}>Log out</h4>
            </a>
        </div>
    );
}

export default TippyOption;