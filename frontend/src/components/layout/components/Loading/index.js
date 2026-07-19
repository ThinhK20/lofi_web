import styles from "./LoadingComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const LoadingComponent = () => {
    return (
        <div className={cx("container")} role="status" aria-label="Loading background">
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingComponent;
