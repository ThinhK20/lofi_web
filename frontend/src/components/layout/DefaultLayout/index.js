import classNames from "classnames/bind";
import { memo } from "react";
import Header from "../components/Header";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default memo(DefaultLayout);
