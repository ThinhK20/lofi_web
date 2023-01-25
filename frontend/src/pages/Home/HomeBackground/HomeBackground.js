import { useQuery } from "@tanstack/react-query"
import videoAPI from "~/api/videoAPI"
import { memo, useEffect, useMemo } from "react" 
import VideoComponent from "~/components/layout/components/VideoComponent" 
import Loading from "~/pages/Loading"
import { useDispatch, useSelector } from "react-redux"
import { updateVideoStorage } from "~/components/Redux/videoSlice"

const HomeBackground = () => { 
    const { currentScenes } = useSelector(state => state.general)

    const {data : videoResponse, isSuccess: isVideoSuccess, isLoading  } = useQuery({
        queryKey: ['videoData', currentScenes],
        queryFn: () => videoAPI.getVideosFromTopic(currentScenes), 
        keepPreviousData: true,
        staleTime: Infinity
    })     


    const { videos } = useSelector(state => state.videoStorage) 
    const dispatch = useDispatch()

    useEffect(() => {
        if (isVideoSuccess) {    
            dispatch(updateVideoStorage({
                topic: currentScenes,
                data: videoResponse.data.reduce((prev, curr) => {
                    return {...prev, [curr.caption]: videoAPI.getVideo(curr.videoName)}
                }, {})
            }))
        } 
    }, [isVideoSuccess, currentScenes, videoResponse?.data])

    return (
        <>
            {isLoading && <Loading/>}
            {isVideoSuccess 
                && 
                <>
                    <VideoComponent srcVideo={videos?.[currentScenes]?.['day-sunny']} themeCondition="light" rainCondition={false}/>
                    <VideoComponent srcVideo={videos?.[currentScenes]?.['day-rainny']} themeCondition="light" rainCondition={true}/>
                    <VideoComponent srcVideo={videos?.[currentScenes]?.['night-clear']} themeCondition="dark" rainCondition={false}/>
                    <VideoComponent srcVideo={videos?.[currentScenes]?.['night-rainny']} themeCondition="dark" rainCondition={true}/>
                </>
            }    
        </>
    )
} 

export default memo(HomeBackground)