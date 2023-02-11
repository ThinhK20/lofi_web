import classNames from "classnames/bind";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "~/pages/Loading";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, themeCondition, rainCondition }) => {
    const { theme, rain } = useSelector((state) => state.general);
    const [isLoading, setIsLoading] = useState(true);
    const checkShowVideo = useMemo(() => {
        const showVideoCondition = theme === themeCondition && rainCondition === rain;
        if (showVideoCondition) return true;
        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, themeCondition, rainCondition, rain, srcVideo]);

    return (
        <>
            {srcVideo && (
                <>
                    {checkShowVideo && isLoading && <Loading />}
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
