import { createSlice } from "@reduxjs/toolkit"

const initialValue = null

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserData(state, action) {
            return action.payload
        }
    }
})

const { actions } = userSlice
export const { setUserData  } = actions
export default userSlice.reducer