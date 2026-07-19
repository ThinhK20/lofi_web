import React from "react";
const AboutUs = React.lazy(() => import("~/pages/AboutUs"));
const Contact = React.lazy(() => import("~/pages/Contact"));
const HowItWorks = React.lazy(() => import("~/pages/HowItWorks"));
const Home = React.lazy(() => import("~/pages/Home"));

export const publicRoutes = [
    { path: "/", component: Home },
    { path: "/about-us", component: AboutUs, layout: null },
    { path: "/contact", component: Contact, layout: null },
    { path: "/how-it-works", component: HowItWorks, layout: null },
];

export const privateRoutes = [];
