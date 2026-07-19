import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { images } from "~/assets";
import styles from "./HowItWorks.module.scss";

const cx = classNames.bind(styles);

const HowItWorks = () => {
    return (
        <div className={cx("container")}>
            <Link to="/" className={cx("btn")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Home</span>
            </Link>

            <img src={images.anime_dancing} className={cx("image")} alt="" />
            <div className={cx("box")}>
                <h1>How it works</h1>
                <span>
                    This offline version runs entirely in your browser:
                    <ul>
                        <li>React</li>
                        <li>Local video and audio assets</li>
                        <li>Redux for player preferences</li>
                        <li>Browser audio controls</li>
                    </ul>
                </span>
            </div>
        </div>
    );
};

export default HowItWorks;
