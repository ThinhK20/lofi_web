import React, { useState, useEffect } from "react";
import axios from "axios";
import { Blurhash } from "react-blurhash";

function LazyImageWithBlurhash({ src, width, height, hash }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        axios
            .get(src, {
                responseType: "arraybuffer",
            })
            .then((response) => {
                const data = Buffer.from(response.data, "binary").toString("base64");
                setImageData(`data:image/jpeg;base64,${data}`);
            })
            .catch(() => {
                setError(true);
            });
    }, [src]);

    const handleImageLoad = () => {
        setLoaded(true);
    };

    const handleImageError = () => {
        setError(true);
    };

    return (
        <>
            {!loaded && !error && <Blurhash hash={hash} width={width} height={height} />}
            {loaded && !error && (
                <img
                    src={imageData}
                    alt=""
                    width={width}
                    height={height}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
        </>
    );
}

export default LazyImageWithBlurhash;
