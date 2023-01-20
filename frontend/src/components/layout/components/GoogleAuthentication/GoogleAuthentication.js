/* eslint-disable no-undef */
import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserData } from "~/components/Redux/userSlice"
import { GOOGLE_CLIENT_ID } from "~/secret"


const GoogleAuthentication = () => {  
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const handleCallbackResponse = (response) => {
        const userObject = jwtDecode(response.credential)
        dispatch(setUserData({ 
            accessToken: response.credential,
            user: {
                username: userObject.given_name,
                email: userObject.email,
                avatar: userObject.picture,
                lofiUsername: userObject.name,
                verified: true,
                service: true
            }
        })) 
        navigation('/')
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        })  

        google.accounts.id.renderButton(
            document.getElementById("signInGoogleDiv"),
            {theme: "filled_black", size: "large"}
        )
    }, [])

    return (
        <>
            <div style={{paddingTop: "20px"}} id="signInGoogleDiv"></div>
        </>
    )
}

export default GoogleAuthentication