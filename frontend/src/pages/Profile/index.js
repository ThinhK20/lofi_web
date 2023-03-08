import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageAPI from "~/api/imageAPI";
import styles from "./Profile.module.scss";
import EditProfile from "./EditProfile";

const cx = classNames.bind(styles);
function Profile() {
    const user = useSelector((state) => state.user);
    const theme = useSelector((state) => state.general).theme;
    const [showEditProfile, setShowEditProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {user && (
                <div className={cx("wrapper", theme === "light" && "dark")}>
                    <img
                        loading="eager"
                        alt="wallpaper"
                        width={"100%"}
                        height={300}
                        className={cx("wallpaper")}
                        src={imageAPI.getImage(user.user.profile.wallpaper)}
                    />
                    <div className={cx("inner")}>
                        <div className={cx("heading-inner")}>
                            <div className={cx("heading-avatar-box")}>
                                <div className={cx("heading-avatar-box__content")}>
                                    <img
                                        decoding="async"
                                        loading="lazy"
                                        src={
                                            !user.user.service ? imageAPI.getImage(user.user.avatar) : user.user.avatar
                                        }
                                        alt="avatar"
                                        className={cx("heading-avatar")}
                                    />
                                </div>
                                <h1 className={cx("heading-name")}>{user.user.lofiUsername}</h1>
                            </div>
                            <button className={cx("btn")} onClick={() => setShowEditProfile(true)}>
                                Edit profile
                            </button>
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
                                        href={user.user.profile.facebook}
                                        className={cx("text-content")}
                                    >
                                        {user.user.profile.facebook !== "" && <>{user.user.lofiUsername}</>}
                                    </a>
                                </div>
                                <div className={cx("inner-row-item")}>
                                    <h4 className={cx("title")}>E-mail: </h4>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`mailto:${user.user.email}`}
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
                                        href={user.user.profile.twitter}
                                        className={cx("text-content")}
                                    >
                                        {user?.user?.profile?.twitter !== "" && (
                                            <>
                                                @
                                                {
                                                    user?.user?.profile?.twitter?.split("/")[
                                                        user?.user?.profile?.twitter?.split("/").length - 1
                                                    ]
                                                }
                                            </>
                                        )}
                                    </a>
                                </div>
                                <div className={cx("inner-row-item")}>
                                    <h4 className={cx("title")}>Phone: </h4>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`tel:${user.user.profile.phone}`}
                                        className={cx("text-content")}
                                    >
                                        {user.user.profile.phone}
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
                                    <span className={cx("text-content")}>{user.user.profile.location}</span>
                                </div>
                                <div className={cx("inner-row-item")}>
                                    <h4 className={cx("title")}>Birthdate: </h4>
                                    <span className={cx("text-content")}>13th August, 2002</span>
                                </div>
                                <div className={cx("inner-row-item")}>
                                    <h4 className={cx("title")}>Gender: </h4>
                                    <span className={cx("text-content")}>{user.user.profile.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showEditProfile && <EditProfile onShow={setShowEditProfile} />}
                </div>
            )}
        </>
    );
}

export default Profile;
