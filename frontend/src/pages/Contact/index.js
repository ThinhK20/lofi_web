import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { images } from "~/assets";
import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

const Contact = () => {
    return (
        <div className={cx("container")}>
            <Link to="/" className={cx("btn")}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Home</span>
            </Link>

            <img src={images.anime_dancing} className={cx("image")} alt="Not Found image" />
            <div className={cx("box")}>
                <h1>Contact Us</h1>
                <p>This offline build does not send form submissions. Please contact us by email instead.</p>
                <a href="mailto:thinhnguyent.2002@gmail.com">thinhnguyent.2002@gmail.com</a>
            </div>
        </div>
    );
};

export default Contact;
