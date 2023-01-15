import styles from "./Loading.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";

const cx = classNames.bind(styles);

const Loading = () => { 
    return (
        <div className={cx("container")}>
            <div className={cx('loading')}>
            <img src={images.logo} className={cx("img")} alt="Loading_img" />
                <div className={cx("loading-text")}>
                    <span className={cx("loading-text-words")}>L</span>
                    <span className={cx("loading-text-words")}>O</span>
                    <span className={cx("loading-text-words")}>A</span>
                    <span className={cx("loading-text-words")}>D</span>
                    <span className={cx("loading-text-words")}>I</span>
                    <span className={cx("loading-text-words")}>N</span>
                    <span className={cx("loading-text-words")}>G</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
