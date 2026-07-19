import { memo, useMemo, useState } from "react";
import VideoComponent from "~/components/layout/components/VideoComponent";
import { useSelector } from "react-redux";
import { images } from "~/assets";
import { getBackgroundVideo } from "~/data/mediaCatalog";
import LoadingComponent from "~/components/layout/components/Loading";
import styles from "./HomeBackground.module.scss";

const HomeBackground = () => {
    const { theme, rain } = useSelector((state) => state.general);
    const [isReady, setIsReady] = useState(false);
    const [hasError, setHasError] = useState(false);
    const source = useMemo(() => getBackgroundVideo({ theme, rain }), [theme, rain]);

    return (
        <div className={styles.background} aria-busy={!isReady && !hasError}>
            {hasError && <img src={images.scenes_background_chillVipe} alt="Chill Vibes scene" className={styles.preview} />}
            {!isReady && !hasError && <LoadingComponent />}
            <VideoComponent
                key={source}
                srcVideo={source}
                onReady={() => {
                    setHasError(false);
                    setIsReady(true);
                }}
                onLoadStart={() => {
                    setHasError(false);
                    setIsReady(false);
                }}
                onError={() => setHasError(true)}
                isVisible={isReady && !hasError}
            />
        </div>
    );
};

export default memo(HomeBackground);
