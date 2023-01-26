import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageAPI from "~/api/imageAPI";
import userAPI from "~/api/userAPI";
import Avatar from "~/components/layout/components/Avatar";
import { setUserProfileInfo } from "~/components/Redux/userSlice";
import styles from "./EditProfile.module.scss";

const cx = classNames.bind(styles);

const EditProfile = ({ onShow }) => {
    const user = useSelector((state) => state.user);
    const [showAvatar, setShowAvatar] = useState(false); 
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(); 
    const [previewAvatar, setPreviewAvatar] = useState(imageAPI.getImage(user.user.avatar))
    const [previewWallpaper, setPreviewWallpaper] = useState(imageAPI.getImage(user.user.profile.wallpaper)) 
    const [croppedAvatar, setCroppedAvatar] = useState()
    const avatarMutation = useMutation({
        mutationFn: userAPI.uploadAvatar
    })  

    const profileInfoMutation = useMutation({
        mutationFn: userAPI.updateProfileInfo
    })



    const handleSubmit = (event) => {
        event.preventDefault();  
        const formData = new FormData(event.target)  
        const decode = jwtDecode(user.accessToken)
        const submitData = {
            id: decode._id,
            facebook: formData.get('facebook'),
            twitter: formData.get('twitter'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            birthdate: formData.get('birthdate'),
            gender: formData.get('gender')
        }
        profileInfoMutation.mutate(submitData, {
            onSuccess: () => { 
                dispatch(setUserProfileInfo(submitData))
                toast("Update profile successfully !", {
                    theme: "dark",
                    type: "success"
                })
            },
            onError: (err) => {
                if (err.response.data.message) {
                    toast(`Update profile failed: ${err.response.data.message}.`, {
                        theme: "dark",
                        type: "error"
                    })
                } else {
                    toast("Update profile failed ! Please try again.", {
                        theme: "dark",
                        type: "error"
                    })
                }
            },
            onSettled: () => {
                onShow(false)
            }
        })  

        if (croppedAvatar) {
            avatarMutation.mutate({
                    id: decode._id,
                    avatar: croppedAvatar
                }, {
                    onSuccess: () => {
                        toast("Upload avatar successfully ! Try login again to update.", {
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
                    }, 
                    onSettled: () => {
                        setCroppedAvatar(null)
                    }
                })
        } 

    };

    const handleCancel = () => {
        onShow(false);
    };

    const handleUploadAvatar = (event) => {
        if (event.target.files.length === 0 || !event.target.files[0]) return;
        setShowAvatar(true)
        setAvatar(event.target.files[0])
    }  

    const handleUploadWallpaper = (event) => {
        if (event.target.files.length === 0 || !event.target.files[0]) return;
        setPreviewWallpaper(URL.createObjectURL(event.target.files[0]))
    }

    const handleCroppedAvatar = (url, file) => { 
        if (url === '' || file === '') return;
        setPreviewAvatar(url) 
        setCroppedAvatar(file)
        // const decode = jwtDecode(user.accessToken) 
        // avatarMutation.mutate({
        //     id: decode._id,
        //     avatar: file
        // }, {
        //     onSuccess: () => {
        //         toast("Upload avatar successfully ! Try login again.", {
        //             theme: "dark",
        //             type: "success"
        //         })
        //     },
        //     onError: (err) => {
        //         if (err.response.data.message) {
        //             toast(`Upload avatar failed: ${err.response.data.message}.`, {
        //                 theme: "dark",
        //                 type: "error"
        //             })
        //         } else {
        //             toast("Upload avatar failed ! Please try again.", {
        //                 theme: "dark",
        //                 type: "error"
        //             })
        //         }
        //     } 
        // })
    } 

    return (
        <div className={cx("container")}>
            <form className={cx("form-submit")} onSubmit={handleSubmit}>
                <h1 className={cx("heading")}>Edit profile</h1>
                <div className={cx("image-group")}>
                    <div className={cx("wallpaper-group")}>
                        <img
                            src={previewWallpaper}
                            alt="edit-form__wallpaper"
                            className={cx("wallpaper")}
                        />
                        <label htmlFor="upload-wallpaper" className={cx("upload-wallpaper")}>
                            <FontAwesomeIcon icon={faCamera} />
                        </label>
                        <input hidden id="upload-wallpaper" type="file" onClick={handleUploadWallpaper} />
                    </div>
                    <div className={cx("avatar-group")}>
                        <img
                            src={!user.user.service ? previewAvatar : user.user.avatar}
                            alt="edit-form__avatar"
                            className={cx("avatar")}
                        />
                        <label htmlFor="upload-avatar" className={cx("upload-avatar")}>
                            <FontAwesomeIcon icon={faCamera} />
                        </label>
                        <input hidden id="upload-avatar" type="file" onChange={handleUploadAvatar} />
                        {showAvatar && (
                            <Avatar
                                imgUrl={URL.createObjectURL(avatar)}
                                show={showAvatar}
                                onShow={setShowAvatar}
                                onCropped={handleCroppedAvatar}
                            />
                        )}
                    </div>
                </div>
                <div className={cx("form-row")}>
                    <div className={cx("form-col")}>
                        <div className={cx("input-group")}>
                            <label htmlFor="facebook" className={cx("input-label")}>
                                Facebook: 
                            </label>
                            <input id="facebook" defaultValue={user.user.profile.facebook} name="facebook" className={cx("input-item")} type="text" />
                        </div>
                        <div className={cx("input-group")}>
                            <label htmlFor="twitter" className={cx("input-label")}>
                                Twitter:
                            </label>
                            <input id="twitter" name="twitter" defaultValue={user.user.profile.twitter} className={cx("input-item")} type="text" />
                        </div>
                        <div className={cx("input-group")}>
                            <label htmlFor="phone" className={cx("input-label")}>
                                Phone:
                            </label>
                            <input id="phone" name="phone" defaultValue={user.user.profile.phone} className={cx("input-item")} type="tel" />
                        </div>
                    </div>
                    <div className={cx("form-col")}>
                        <div className={cx("input-group")}>
                            <label htmlFor="location" className={cx("input-label")}>
                                Location:
                            </label>
                            <input id="location" name="location" defaultValue={user.user.profile.location} className={cx("input-item")} type="text" />
                        </div>
                        <div className={cx("input-group")}>
                            <label htmlFor="birthdate" className={cx("input-label")}>
                                Birthdate:
                            </label>
                            <input id="birthdate" name="birthdate" defaultValue={user.user.profile.birthdate} className={cx("input-item")} type="date" />
                        </div>
                        <div className={cx("input-group")}>
                            <label htmlFor="gender" className={cx("input-label")}>
                                Gender:
                            </label>
                            <select id="gender" name="gender" defaultValue={user.user.profile.gender} className={cx("input-item")}>
                                <option className={cx("input-option")} value="Male" >Male</option>
                                <option className={cx("input-option")} value="Female" >Female</option>
                                <option className={cx("input-option")} value="Other"  >
                                    Other
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={cx("group-btn")}>
                    <button className={cx("btn-save")} type="submit">
                        Save
                    </button>
                    <div className={cx("btn-cancel")} onClick={handleCancel}>
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
