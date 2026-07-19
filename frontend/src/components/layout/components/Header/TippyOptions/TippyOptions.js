import {
    faExclamationCircle,
    faGear,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./TippyOptions.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function TippyOption() {
    return (
        <div className={cx("wrapper")}>
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
        </div>
    );
}

export default TippyOption;
