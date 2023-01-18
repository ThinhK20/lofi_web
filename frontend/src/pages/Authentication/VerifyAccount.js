import styles from "./Authentication.module.scss";
import classNames from "classnames/bind";
import { images } from "~/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";


const cx = classNames.bind(styles);

function VerifyAccount(props) {  
    const { state } = useLocation()
    console.log(state)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit...")
    } 

    const handleSendAgain = () => {
        console.log("Send again...")
    }

    return (
        <div className={cx("wrapper")}>
            <img className={cx("logo")} src={images.logo} alt="logo" />
            <div className={cx("content")}>
                <div className={cx("heading")}>
                    <h1 className={cx("heading-welcome")}>Verify your account !</h1>
                    <h2 className={cx("heading-content")} style={{opacity: 0.6}}>To complete your account, we've been send a verify email. Please check and paste code into the text box below.</h2>

                </div>
                <form className={cx("form")}  onSubmit={handleSubmit}>
                    <div className={cx("input-box")}>
                        <div className={cx("input-item")}>
                            <label htmlFor="verifyCode" className={cx("input-label")}>
                                Code: 
                            </label>
                            <input
                                type="text"
                                id="verifyCode"
                                name="verifyCode"
                                className={cx("input")}
                            />
                        </div>
                      
                    </div>
                    <div className={cx("signup-btn-box")}>
                        <button type="submit" className={cx("signup-btn")}>
                            Verify
                        </button>
                    </div>
                </form>
                <footer className={cx("footer")}>
                    <span className={cx("footer-text")}>Didn't receive the verify email ? </span>
                    <button className={cx('btn-send-again__verify')} onClick={handleSendAgain}>
                        Send again !
                    </button>
                    
                </footer>
            </div>
            <Link to={"/login"} className={cx("back-menu")}>
                <FontAwesomeIcon icon={faChevronLeft} className={cx("back-icon")} />
                <h3 className={cx("back-content")}>Back to Login</h3>
            </Link>
        </div>
    );
}

export default VerifyAccount;
