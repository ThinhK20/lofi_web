import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import imageAPI from "~/api/imageAPI";
import { images } from "~/assets";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Profile() {
    const user = useSelector(state => state.user)
    const theme = useSelector(state => state.general).theme; 

    return (
        <div className={cx("wrapper", theme === 'light' && "dark")}>
            <img alt="wallpaper" className={cx("wallpaper")} src={images.test_wallpaper} />
            <div className={cx("inner")}>
                <div className={cx("heading-inner")}>
                    <div className={cx("heading-avatar-box")}>
                        <img src={imageAPI.getImage(user.user.avatar)} alt="avatar" className={cx("heading-avatar")} />
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
    );
}

export default Profile;
