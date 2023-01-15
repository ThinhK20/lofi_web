import styles from "./Authentication.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authAPI from "~/api/authAPI";
import { useDispatch } from "react-redux";
import { setUserData } from "~/components/Redux/userSlice";

const cx = classNames.bind(styles);

function Login() { 
    const { mutate } = useMutation({
        mutationFn: authAPI.loginUser
    }) 

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); 
        console.log("Data: ", formData.get('username'))
        mutate({ 
            username: formData.get('username'), 
            password: formData.get('password')
        }, {
            onSuccess: (data) => {
                dispatch(setUserData(data.data)) 
                navigate('/')
            }
        })
    }


    return (
        <div className={cx("wrapper")}>
            <img className={cx("logo")} src={images.logo} alt="logo" />
            <div className={cx("content")}>
                <div className={cx("heading")}>
                    <h1 className={cx("heading-welcome")}>Welcome back!</h1>
                    <h2 className={cx("heading-content")}>Log In to your account.</h2>
                </div>
                <form className={cx("form")} onSubmit={handleSubmit}>
                    <div className={cx("input-box")}>
                        <div className={cx("input-item")}>
                            <label htmlFor="username" className={cx("input-label")}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
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
                                name="password"
                                className={cx("input")}
                            />
                        </div>
                    </div>
                    <h4 className={cx("policy-text")}>
                        <a href=".">Forgot password ?</a>
                    </h4>
                    <div className={cx("signup-btn-box")}>
                        <button type="submit" className={cx("signup-btn")}>
                            Sign Up
                        </button>
                    </div>
                </form>
                <footer className={cx("footer")}>
                    <span className={cx("footer-text")}>Don't have an account ? </span>
                    <Link to={"/signup"} href="." className={cx("login")}>
                        Sign up for free
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

export default Login;
