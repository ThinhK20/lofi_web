import { memo, useEffect, useMemo, useState } from "react";
import VideoComponent from "~/components/layout/components/VideoComponent";
import { useSelector } from "react-redux";
import { images } from "~/assets";
import { getBackgroundVideo } from "~/data/mediaCatalog";
import LoadingComponent from "~/components/layout/components/Loading";
import styles from "./HomeBackground.module.scss";

const HomeBackground = () => {
    const { theme, rain } = useSelector((state) => state.general);
    const source = useMemo(() => getBackgroundVideo({ theme, rain }), [theme, rain]);
    const [activeLayer, setActiveLayer] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [layers, setLayers] = useState(() => [
        { src: source, ready: false },
        { src: null, ready: false },
    ]);

    useEffect(() => {
        const preloadLayer = activeLayer === 0 ? 1 : 0;

        setLayers((currentLayers) => {
            if (currentLayers[activeLayer].src === source || currentLayers[preloadLayer].src === source) {
                return currentLayers;
            }

            return currentLayers.map((layer, index) => (
                index === preloadLayer ? { src: source, ready: false } : layer
            ));
        });
        setHasError(false);
    }, [activeLayer, source]);

    const handleReady = (index, readySource) => {
        setLayers((currentLayers) => currentLayers.map((layer, layerIndex) => (
            layerIndex === index ? { ...layer, ready: true } : layer
        )));

        if (readySource === source) {
            setActiveLayer(index);
        }
    };

    const handleError = (index, failedSource) => {
        if (index === activeLayer && failedSource === source) {
            setHasError(true);
        }
    };

    const isReady = layers[activeLayer].ready;

    return (
        <div className={styles.background} aria-busy={!isReady && !hasError}>
            {hasError && <img src={images.scenes_background_chillVipe} alt="Chill Vibes scene" className={styles.preview} />}
            {!isReady && !hasError && <LoadingComponent />}
            {layers.map((layer, index) => layer.src && (
                <VideoComponent
                    key={index}
                    srcVideo={layer.src}
                    onReady={() => handleReady(index, layer.src)}
                    onError={() => handleError(index, layer.src)}
                    isVisible={index === activeLayer && layer.ready && !hasError}
                />
            ))}
        </div>
    );
};

export default memo(HomeBackground);
