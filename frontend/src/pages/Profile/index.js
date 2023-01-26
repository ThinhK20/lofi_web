import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageAPI from "~/api/imageAPI";
import Avatar from "~/components/layout/components/Avatar";
import styles from "./Profile.module.scss";
import jwtDecode from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import userAPI from "~/api/userAPI";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function Profile() {
    const user = useSelector(state => state.user)
    const theme = useSelector(state => state.general).theme;   
    const [avatar, setAvatar] = useState()
    const [showAvatar, setShowAvatar] = useState(false)  
    const navigate = useNavigate()
    const avatarMutation = useMutation({
        mutationFn: userAPI.uploadAvatar
    })

    const handleUploadAvatar = (event) => {
        setShowAvatar(true)
        setAvatar(event.target.files[0])
    } 

    const handleCroppedAvatar = (url, file) => { 
        if (url === '' || file === '') return;
        const decode = jwtDecode(user.accessToken)
        avatarMutation.mutate({
            id: decode._id,
            avatar: file
        }, {
            onSuccess: () => {
                toast("Upload avatar successfully !", {
                    theme: "dark",
                    type: "success"
                })
            },
            onError: (err) => {
                if (err.response.data.message) {
                    toast(`Upload avatar failed: ${err.response.data.message}.`, {
                        theme: "dark",
                        type: "error"
                    })
                } else {
                    toast("Upload avatar failed ! Please try again.", {
                        theme: "dark",
                        type: "error"
                    })
                }
            } 
        })
    } 

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
       <>
        {user &&
            <div className={cx("wrapper", theme === 'light' && "dark")}>
                <img alt="wallpaper" className={cx("wallpaper")} src={imageAPI.getImage(user.user.profile.wallpaper)} />
                <div className={cx("inner")}>
                    <div className={cx("heading-inner")}>
                        <div className={cx("heading-avatar-box")}>
                            <div className={cx('heading-avatar-box__content')}>
                                <img src={!user.user.service ? imageAPI.getImage(user.user.avatar) : user.user.avatar} alt="avatar" className={cx("heading-avatar")} />
                                <label htmlFor="upload-avatar" className={cx('upload-avatar')}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </label> 
                                {
                                    showAvatar && 
                                    <Avatar imgUrl={URL.createObjectURL(avatar)} show={showAvatar} onShow={setShowAvatar} onCropped={handleCroppedAvatar}/>
                                }
                                <input type={"file"} id="upload-avatar" name="avatar" onChange={handleUploadAvatar} alt="upload-avatar-input" hidden />
                            </div>
                            <h1 className={cx("heading-name")}>{user.user.lofiUsername}</h1>
                        </div>
                        <button className={cx("btn")}>Edit profile</button>
                    </div>
                    <div className={cx("inner-content")}>
                        <div className={cx("inner-left")}>
                            <div className={cx("inner-headline")}>
                                <h3 className={cx("inner-headline-text")}>Contact</h3>
                                <span className={cx("inner-headline-line")}></span>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Facebook:</h4>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.facebook.com/profile.php?id=100025801546467"
                                    className={cx("text-content")}
                                >
                                    Thịnh Nguyễn
                                </a>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>E-mail: </h4>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.facebook.com/profile.php?id=100025801546467"
                                    className={cx("text-content")}
                                >
                                    {user.user.email}
                                </a>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Twitter: </h4>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://twitter.com/syromei"
                                    className={cx("text-content")}
                                >
                                    @syromei
                                </a>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Phone: </h4>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.facebook.com/profile.php?id=100025801546467"
                                    className={cx("text-content")}
                                >
                                    0783877917
                                </a>
                            </div>
                        </div>
                        <div className={cx("inner-right")}>
                            <div className={cx("inner-headline")}>
                                <h3 className={cx("inner-headline-text")}>Basic information</h3>
                                <span className={cx("inner-headline-line")}></span>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Username:</h4>
                                <span className={cx("text-content")}>{user.user.lofiUsername}</span>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Location: </h4>
                                <span className={cx("text-content")}>Tokyo, Japan</span>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Birthdate: </h4>
                                <span className={cx("text-content")}>13th August, 2002</span>
                            </div>
                            <div className={cx("inner-row-item")}>
                                <h4 className={cx("title")}>Gender: </h4>
                                <span className={cx("text-content")}>Male</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
       </>
    );
}

export default Profile;
