import { createSlice } from "@reduxjs/toolkit"

const initialValue = null

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserData(state, action) {
            return action.payload
        },
        uploadAvatar(state, action) {
            state.user.avatar = action.payload
        }
    }
})

const { actions } = userSlice
export const { setUserData, uploadAvatar  } = actions
export default userSlice.reducer