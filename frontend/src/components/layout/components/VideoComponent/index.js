import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import LoadingComponent from "../Loading";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, checkShowVideo, onLoading = null }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (onLoading) {
            onLoading(true);
        }
    }, [onLoading]);

    return (
        <>
            {srcVideo && (
                <>
                    {isLoading && <LoadingComponent />}

                    <video
                        className={cx("video-background", checkShowVideo && "opacity-1")}
                        src={srcVideo}
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => {
                            if (onLoading) {
                                setIsLoading(false);
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
