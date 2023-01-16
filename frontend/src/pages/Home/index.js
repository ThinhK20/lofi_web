import classNames from "classnames/bind";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import RainThemeButton from "~/components/layout/components/RainThemeButton";

import styles from "./Home.module.scss";
import HomeDateWidget from "./HomeDateWidget/HomeDateWidget";
import HomeLateralMenu from "./HomeLateralMenu/HomeLateralMenu";
import HomeThemeControl from "./HomeThemeControl/HomeThemeControl";

const HomeBackground = React.lazy(() => import("./HomeBackground/HomeBackground"))

const cx = classNames.bind(styles);
function Home() {
    const homeWidgetState = useSelector((state) => state.general).activeDateWidget;
    return ( 
            <section className={cx("wrapper")}>
                    <HomeBackground/> 
                    <HomeThemeControl />
                    <RainThemeButton />
                    <HomeLateralMenu />
                    {homeWidgetState && <HomeDateWidget />}
            </section>
    );
}

export default memo(Home);
