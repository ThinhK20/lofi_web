import classNames from "classnames/bind";
import { memo } from "react";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, isVisible, onReady, onLoadStart, onError }) => (
    <video
        className={cx("video-background", isVisible && "opacity-1")}
        src={srcVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={onReady}
        onLoadStart={onLoadStart}
        onError={onError}
    />
);

export default memo(VideoComponent);
