import styles from "./LoadingComponent.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";

const cx = classNames.bind(styles);

const LoadingComponent = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("loading")}>
                <img src={images.logo} className={cx("img")} alt="Loading_img" />
            </div>
        </div>
    );
};

export default LoadingComponent;
