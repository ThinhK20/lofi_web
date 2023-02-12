import styles from "./LoadingComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const LoadingComponent = () => {
    return <div className={cx("container")}></div>;
};

export default LoadingComponent;
