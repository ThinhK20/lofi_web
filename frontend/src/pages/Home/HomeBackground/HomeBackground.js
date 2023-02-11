import { useQuery } from "@tanstack/react-query";
import videoAPI from "~/api/videoAPI";
import { memo, useEffect } from "react";
import VideoComponent from "~/components/layout/components/VideoComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoStorage } from "~/components/Redux/videoSlice";
import Loading from "~/pages/Loading";

const HomeBackground = () => {
    const { currentScenes } = useSelector((state) => state.general);

    const {
        data: videoResponse,
        isSuccess: isVideoSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["videoData", currentScenes],
        queryFn: () => videoAPI.getVideoUrlsFromTopic(currentScenes),
        keepPreviousData: true,
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

    return (
        <>
            {!videos && isLoading && <Loading />}
            <>
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["day-sunny"]}
                    themeCondition="light"
                    rainCondition={false}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["day-rainny"]}
                    themeCondition="light"
                    rainCondition={true}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["night-clear"]}
                    themeCondition="dark"
                    rainCondition={false}
                />
                <VideoComponent
                    srcVideo={videos?.[currentScenes]?.["night-rainny"]}
                    themeCondition="dark"
                    rainCondition={true}
                />
            </>
        </>
    );
};

export default memo(HomeBackground);
