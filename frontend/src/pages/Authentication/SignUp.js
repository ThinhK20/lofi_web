import styles from "./Authentication.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx("wrapper")}>
            <img className={cx("logo")} src={images.logo} alt="logo" />
            <div className={cx("content")}>
                <div className={cx("heading")}>
                    <h1 className={cx("heading-welcome")}>Nice to meet you!</h1>
                    <h2 className={cx("heading-content")}>Sign up for a free account.</h2>
                </div>
                <form className={cx("form")}>
                    <div className={cx("input-box")}>
                        <div className={cx("input-item")}>
                            <label htmlFor="username" className={cx("input-label")}>
                                Username
                            </label>
                            <input
                                type="username"
                                id="username"
                                placeholder="admin"
                                name="username"
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="email" className={cx("input-label")}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="admin@company.com"
                                name="email"
                                className={cx("input")}
                            />
                        </div>
                        <div className={cx("input-item")}>
                            <label htmlFor="password" className={cx("input-label")}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="123456"
                                name="password"
                                className={cx("input")}
                            />
                        </div>
                    </div>
                    <h4 className={cx("policy-text")}>
                        By signing up, you agree to our
                        <a href=".">Privacy Policy & Term of Service</a>
                    </h4>
                    <div className={cx("signup-btn-box")}>
                        <a href="." className={cx("signup-btn")}>
                            Sign Up
                        </a>
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
