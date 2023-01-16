import { useQuery } from "@tanstack/react-query"
import videoAPI from "~/api/videoAPI"
import { memo, useMemo } from "react" 
import VideoComponent from "~/components/layout/components/VideoComponent" 
import Loading from "~/pages/Loading"

const HomeBackground = () => {
    const {data : videoResponse, isSuccess: isVideoSuccess, isLoading  } = useQuery({
        queryKey: ['videoData'],
        queryFn: () => videoAPI.getVideosFromTopic('chill-vibes'),
        keepPreviousData: true,
        staleTime: Infinity
    })   

    const videoData = useMemo(() => { 
        if (isVideoSuccess) { 
            return videoResponse.data.reduce((prev, curr) => {
                return {...prev, [curr.caption]: videoAPI.getVideo(curr.videoName)}
            }, {}) 
        } 
        return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoSuccess])  

    return (
        <>
            {isLoading && <Loading/>}
            {isVideoSuccess 
                && 
                <>
                    <VideoComponent srcVideo={videoData['day-sunny']} themeCondition="light" rainCondition={false}/>
                    <VideoComponent srcVideo={videoData['day-rainny']} themeCondition="light" rainCondition={true}/>
                    <VideoComponent srcVideo={videoData['night-clear']} themeCondition="dark" rainCondition={false}/>
                    <VideoComponent srcVideo={videoData['night-rainny']} themeCondition="dark" rainCondition={true}/>
                </>
            }    
        </>
    )
} 

export default memo(HomeBackground)