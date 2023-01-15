import classNames from "classnames/bind";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "~/pages/Loading";
import styles from "./VideoComponent.module.scss";

const cx = classNames.bind(styles);

const VideoComponent = ({ srcVideo, themeCondition, rainCondition }) => {
    const { theme, rain } = useSelector((state) => state.general); 
    const [isLoading, setIsLoading] = useState(true);

    return (  
        <> 
            {isLoading && <Loading/>}
            <video
                className={cx("video-background", theme === themeCondition && rain === rainCondition && "opacity-1")}
                src={srcVideo}
                autoPlay
                loop
                muted 
                onLoadedData={() => setIsLoading(false)}
            />
        </>
    );
};

export default memo(VideoComponent);
