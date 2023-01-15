import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDateWidget } from "~/components/Redux/generalSlice";
import styles from "./HomeDateWidget.module.scss";
const cx = classNames.bind(styles);
function HomeDateWidget() {
    const dispatch = useDispatch();
    const dateStatus = useSelector((state) => state.general).dateState;
    const handleClose = () => {
        dispatch(setActiveDateWidget(false));
    };

    const handleWelcome = () => {
        const todayHour = dateStatus.getHours();
        if (todayHour >= 5 && todayHour <= 12) {
            return "Good morning  ☀️";
        } else if (todayHour > 12 && todayHour < 18) {
            return "Good afternoon ☁️";
        } else if (todayHour >= 18) {
            return "Good evening 🌙️";
        } else if (todayHour >= 0 && todayHour < 5) {
            return "Good night 💤";
        }
    };

    const handleDate = () => {
        const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Thursday", "Wednesday", "Friday", "Saturday"];
        const today = dateStatus.getDay();
        const monthOfYear = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = dateStatus.getMonth();
        return `It's ${dayOfWeek[today]}, ${monthOfYear[month]} ${dateStatus.getDate()}`;
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("date-status")}>
                <h1 className={cx("date-welcome")}>{handleWelcome()}</h1>
                <h2 className={cx("date-time")}>{handleDate()}</h2>
            </div>
            <div className={cx("date-content")}>
                <p className={cx("date-quotes")}>
                    Hold on to your dreams of a better life and stay committed to striving to realize it
                </p>
            </div>
            <div className={cx("date-box")}>
                <h1 className={cx("date-hours")}>
                    {dateStatus.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                </h1>
                <FontAwesomeIcon icon={faXmark} className={cx("close")} onClick={handleClose} />
            </div>
        </div>
    );
}

export default memo(HomeDateWidget);
