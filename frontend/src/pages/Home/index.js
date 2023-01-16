import classNames from "classnames/bind";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import RainThemeButton from "~/components/layout/components/RainThemeButton";

import styles from "./Home.module.scss";
import HomeDateWidget from "./HomeDateWidget/HomeDateWidget";

const HomeLateralMenu = React.lazy(() => import("./HomeLateralMenu/HomeLateralMenu")) 
const HomeThemeControl = React.lazy(() => import("./HomeThemeControl/HomeThemeControl"))

const cx = classNames.bind(styles);
function Home() {
    const homeWidgetState = useSelector((state) => state.general).activeDateWidget;
    return ( 
            <section className={cx("wrapper")}> 
                    <HomeThemeControl />
                    <RainThemeButton />
                    <HomeLateralMenu />
                    {homeWidgetState && <HomeDateWidget />}
            </section>
    );
}

export default memo(Home);
