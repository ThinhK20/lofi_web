import { useQuery } from "@tanstack/react-query"
import videoAPI from "~/api/videoAPI"
import { memo, useEffect, useMemo } from "react" 
import VideoComponent from "~/components/layout/components/VideoComponent" 
import Loading from "~/pages/Loading"
import { useDispatch, useSelector } from "react-redux"
import { updateVideoStorage } from "~/components/Redux/videoSlice"

const HomeBackground = () => {
    const {data : videoResponse, isSuccess: isVideoSuccess, isLoading  } = useQuery({
        queryKey: ['videoData'],
        queryFn: () => videoAPI.getVideosFromTopic('chill-vibes'),
        keepPreviousData: true,
        staleTime: Infinity
    })    

    const { videos } = useSelector(state => state.videoStorage) 
    const dispatch = useDispatch()

    useEffect(() => {
        if (isVideoSuccess && videos.length === 0) {  
            dispatch(updateVideoStorage(videoResponse.data.reduce((prev, curr) => {
                return {...prev, [curr.caption]: videoAPI.getVideo(curr.videoName)}
            }, {})))
        } 
    }, [isVideoSuccess])

    return (
        <>
            {isLoading && <Loading/>}
            {isVideoSuccess 
                && 
                <>
                    <VideoComponent srcVideo={videos['day-sunny']} themeCondition="light" rainCondition={false}/>
                    <VideoComponent srcVideo={videos['day-rainny']} themeCondition="light" rainCondition={true}/>
                    <VideoComponent srcVideo={videos['night-clear']} themeCondition="dark" rainCondition={false}/>
                    <VideoComponent srcVideo={videos['night-rainny']} themeCondition="dark" rainCondition={true}/>
                </>
            }    
        </>
    )
} 

export default memo(HomeBackground)