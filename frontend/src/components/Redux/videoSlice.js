import { createSlice } from '@reduxjs/toolkit'


const initialValue = {
    videos: []
}
const videoSlice = createSlice({
    name: 'videoStorage', 
    initialState: initialValue,
    reducers: {
        updateVideoStorage(state, action) {
            state.videos = action.payload
        }        
    }
})

const { actions } = videoSlice 
export const { updateVideoStorage } = actions

export default videoSlice.reducer