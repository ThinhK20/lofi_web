import classNames from "classnames/bind";
import { memo, useEffect } from "react";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, checkShowVideo, onLoading = null }) => {
    useEffect(() => {
        if (onLoading) {
            onLoading(true);
        }
    }, [onLoading]);

    return (
        <>
            {srcVideo && (
                <>
                    <video
                        className={cx("video-background", checkShowVideo && "opacity-1")}
                        src={srcVideo}
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => {
                            if (onLoading) {
                                onLoading(false);
                            }
                        }}
                    />
                </>
            )}
        </>
    );
};

export default memo(VideoComponent);
