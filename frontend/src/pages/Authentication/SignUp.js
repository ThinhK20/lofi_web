import styles from "./Authentication.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import authAPI from "~/api/authAPI";
import { toast } from "react-toastify";
import Avatar from "~/components/layout/components/Avatar";

const cx = classNames.bind(styles);

function SignUp() {
    const { mutate } = useMutation({
        mutationFn: authAPI.registerUser,
    });

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        lofiUsername: "",
        avatar: "",
    });

    const [checked, setChecked] = useState(false);
    const [showCropAvatar, setShowCropAvatar] = useState(false);

    const [errorMessage, setErrorMessage] = useState({
        username: "",
        email: "",
        password: "",
        lofiUsername: "",
        avatar: "",
    });
    const [previewImage, setPreviewImage] = useState("");

    const handleChange = (name) => (event) => {
        if (name === "avatar") {
            if (event.target.files && event.target.files[0]) {
                const previewAvatarUrl = URL.createObjectURL(event.target.files[0]);
                setPreviewImage(previewAvatarUrl);
                setShowCropAvatar(true);
                if (checked) {
                    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
                }
            } else {
                setFormData((prev) => ({ ...prev, [name]: "" }));
                setPreviewImage("");
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: event.target.value }));
            if (checked && event.target.value.length > 0) {
                setErrorMessage((prev) => ({ ...prev, [name]: "" }));
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setChecked(true);
        let isValid = true;
        if (formData.username.length < 6) {
            setErrorMessage((prev) => ({ ...prev, username: "The username must be at least 6 characters." }));
            isValid = false;
        }
        if (formData.email === "") {
            setErrorMessage((prev) => ({ ...prev, email: "Please enter your email address." }));
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorMessage((prev) => ({
                ...prev,
                email: "The email address you entered does not match with required format. Please enter your email address again.",
            }));
            isValid = false;
        }
        if (formData.password === "") {
            isValid = false;
            setErrorMessage((prev) => ({ ...prev, password: "Please enter your password." }));
        } else if (formData.password.length < 6) {
            isValid = false;
            setErrorMessage((prev) => ({ ...prev, password: "The password must be at least 6 characters." }));
        }
        if (formData.lofiUsername === "") {
            isValid = false;
            setErrorMessage((prev) => ({ ...prev, lofiUsername: "Please enter your nickname." }));
        }
        if (formData.avatar === "") {
            isValid = false;
            setErrorMessage((prev) => ({ ...prev, avatar: "Please input your avatar." }));
        }
        if (isValid) {
            mutate(formData, {
                onSuccess: (res) => {
                    toast("Register account successfully !", {
                        theme: "dark",
                        type: "success",
                    });
                    setFormData(() => {
                        return {
                            username: "",
                            email: "",
                            password: "",
                            lofiUsername: "",
                            avatar: "",
                        };
                    });
                    setPreviewImage(() => "");
                },
                onError: (err) => {
                    if (err.response.data.msg) {
                        toast(`Register failed: ${err.response.data.msg}`, {
                            theme: "dark",
                            type: "error",
                        });
                    } else {
                        toast(`Register failed ! Please try again.`, {
                            theme: "dark",
                            type: "error",
                        });
                    }
                },
            });
        }
    };

    const handleCropAvatar = (croppedImg, fileCroppedImg) => {
        setPreviewImage(croppedImg);
        setFormData((prev) => ({ ...prev, avatar: fileCroppedImg }));
    };

    return (
        <div className={cx("wrapper")}>
            <img className={cx("logo")} src={images.logo} alt="logo" />
            <div className={cx("content")}>
                <div className={cx("heading")}>
                    <h1 className={cx("heading-welcome")}>Nice to meet you!</h1>
                    <h2 className={cx("heading-content")}>Sign up for a free account.</h2>
                </div>
                <form className={cx("form")} onSubmit={handleSubmit}>
                    <div className={cx("input-box")}>
                        <div className={cx("input-item")}>
                            <label htmlFor="username" className={cx("input-label")}>
                                Username
                            </label>
                            {checked && (
                                <label htmlFor="username" className={cx("input-label", "error-msg")}>
                                    {errorMessage.username}
                                </label>
                            )}
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange("username")}
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="email" className={cx("input-label")}>
                                Email
                            </label>
                            {checked && (
                                <label htmlFor="email" className={cx("input-label", "error-msg")}>
                                    {errorMessage.email}
                                </label>
                            )}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange("email")}
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="password" className={cx("input-label")}>
                                Password
                            </label>
                            {checked && (
                                <label htmlFor="password" className={cx("input-label", "error-msg")}>
                                    {errorMessage.password}
                                </label>
                            )}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange("password")}
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="lofiUsername" className={cx("input-label")}>
                                Nickname
                            </label>
                            {checked && (
                                <label htmlFor="lofiUsername" className={cx("input-label", "error-msg")}>
                                    {errorMessage.lofiUsername}
                                </label>
                            )}
                            <input
                                type="text"
                                id="lofiUsername"
                                name="lofiUsername"
                                value={formData.lofiUsername}
                                onChange={handleChange("lofiUsername")}
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="avatar" className={cx("input-label")}>
                                Avatar
                            </label>
                            {checked && (
                                <label htmlFor="avatar" className={cx("input-label", "error-msg")}>
                                    {errorMessage.avatar}
                                </label>
                            )}
                            {previewImage && (
                                <img src={previewImage} alt="preview-avatar" className={cx("preview-avatar")} />
                            )}
                            {showCropAvatar && (
                                <Avatar
                                    imgUrl={previewImage}
                                    show={showCropAvatar}
                                    onShow={setShowCropAvatar}
                                    onCropped={handleCropAvatar}
                                />
                            )}

                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleChange("avatar")}
                                className={cx("input")}
                            />
                        </div>
                    </div>
                    <h4 className={cx("policy-text")}>
                        By signing up, you agree to our
                        <a href=".">Privacy Policy & Term of Service</a>
                    </h4>
                    <div className={cx("signup-btn-box")}>
                        <button type="submit" className={cx("signup-btn")}>
                            Sign Up
                        </button>
                    </div>
                </form>
                <footer className={cx("footer")}>
                    <span className={cx("footer-text")}>Already have an account ? </span>
                    <Link to="/login" className={cx("login")}>
                        Log In
                    </Link>
                </footer>
            </div>
            <Link to={"/"} className={cx("back-menu")}>
                <FontAwesomeIcon icon={faChevronLeft} className={cx("back-icon")} />
                <h3 className={cx("back-content")}>Back to Home</h3>
            </Link>
        </div>
    );
}

export default SignUp;
