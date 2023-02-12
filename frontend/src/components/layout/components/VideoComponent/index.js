import classNames from "classnames/bind";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComponent from "../Loading";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, themeCondition, rainCondition }) => {
    const { theme, rain } = useSelector((state) => state.general);
    const [isLoading, setIsLoading] = useState(true);
    const checkShowVideo = useMemo(() => {
        return theme === themeCondition && rainCondition === rain;
    }, [theme, themeCondition, rainCondition, rain]);

    return (
        <>
            {(!srcVideo || isLoading) && <LoadingComponent />}

            {srcVideo && (
                <>
                    <video
                        className={cx("video-background", checkShowVideo && "opacity-1")}
                        src={srcVideo}
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => setIsLoading(false)}
                    />
                </>
            )}
        </>
    );
};

export default memo(VideoComponent);
