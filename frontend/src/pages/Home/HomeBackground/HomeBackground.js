import { useQuery } from "@tanstack/react-query";
import videoAPI from "~/api/videoAPI";
import { memo, useEffect, useState } from "react";
import VideoComponent from "~/components/layout/components/VideoComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoStorage } from "~/components/Redux/videoSlice";
import LoadingComponent from "~/components/layout/components/Loading";

const HomeBackground = () => {
    const { currentScenes, theme, rain } = useSelector((state) => state.general);

    const { data: videoResponse, isSuccess: isVideoSuccess } = useQuery({
        queryKey: ["videoData", currentScenes],
        queryFn: () => videoAPI.getVideoUrlsFromTopic(currentScenes),
        staleTime: Infinity,
    });

    const { videos } = useSelector((state) => state.videoStorage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!videos?.[currentScenes] && isVideoSuccess) {
            (async () => {
                videoResponse.forEach(async (videoRes) => {
                    const blobVideo = await videoAPI.getVideo(videoRes.videoName);
                    if (blobVideo) {
                        dispatch(
                            updateVideoStorage({
                                topic: currentScenes,
                                data: {
                                    caption: videoRes.caption,
                                    blob: blobVideo,
                                },
                            }),
                        );
                    }
                });
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoSuccess, currentScenes, videoResponse, videos]);

    const checkShowVideo = (themeCondition, rainCondition) => {
        return theme === themeCondition && rainCondition === rain;
    };

    const [isLoading, setIsLoadingVideo] = useState(false);

    return (
        <>
            {(!videos || !videos?.[currentScenes] || isLoading) && <LoadingComponent />}
            <>
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["day-sunny"]}
                    checkShowVideo={checkShowVideo("light", false)}
                    onLoading={checkShowVideo("light", false) && setIsLoadingVideo}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["day-rainny"]}
                    checkShowVideo={checkShowVideo("light", true)}
                    onLoading={checkShowVideo("light", true) && setIsLoadingVideo}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["night-clear"]}
                    checkShowVideo={checkShowVideo("dark", false)}
                    onLoading={checkShowVideo("dark", false) && setIsLoadingVideo}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["night-rainny"]}
                    checkShowVideo={checkShowVideo("dark", true)}
                    onLoading={checkShowVideo("dark", true) && setIsLoadingVideo}
                />
            </>
        </>
    );
};

export default memo(HomeBackground);
