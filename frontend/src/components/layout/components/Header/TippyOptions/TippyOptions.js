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
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "~/components/Redux/userSlice";
import styles from "./TippyOptions.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function TippyOption() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setUserData(null));
    };

    return (
        <div className={cx("wrapper")}>
            <Link to="/settings" className={cx("item")}>
                <FontAwesomeIcon icon={faGear} className={cx("icon")} />
                <h4 className={cx("name")}>General settings</h4>
            </Link>
            <Link to="/contact" className={cx("item")}>
                <FontAwesomeIcon icon={faMessage} className={cx("icon")} />
                <h4 className={cx("name")}>Contact us</h4>
            </Link>
            <Link to="/how-it-works" className={cx("item")}>
                <FontAwesomeIcon icon={faGear} className={cx("icon")} />
                <h4 className={cx("name")}>How it works</h4>
            </Link>
            <Link to="/about-us" className={cx("item")}>
                <FontAwesomeIcon icon={faExclamationCircle} className={cx("icon")} />
                <h4 className={cx("name")}>About us</h4>
            </Link>
            {user && (
                <Link to="/login" onClick={handleLogout} className={cx("item")}>
                    <FontAwesomeIcon icon={faRightToBracket} className={cx("icon")} />
                    <h4 className={cx("name")}>Log out</h4>
                </Link>
            )}
        </div>
    );
}

export default TippyOption;
