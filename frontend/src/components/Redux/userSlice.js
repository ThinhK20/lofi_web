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
        },
        setUserProfileInfo(state, action) {
            state.user.profile = {
                ...state.user.profile,
                facebook: action.payload.facebook,
                twitter: action.payload.twitter,
                phone: action.payload.phone,
                location: action.payload.location,
                birthdate: action.payload.birthdate,
                gender: action.payload.gender
            }
        }
    }
})

const { actions } = userSlice
export const { setUserData, uploadAvatar, setUserProfileInfo  } = actions
export default userSlice.reducer