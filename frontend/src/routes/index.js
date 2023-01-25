import React from "react";
const AboutUs = React.lazy(() => import("~/pages/AboutUs"))
const Contact = React.lazy(() => import("~/pages/Contact")) 
const HowItWorks = React.lazy(() => import("~/pages/HowItWorks")) 
const Login = React.lazy(() => import("~/pages/Authentication/LogIn"))
const Profile = React.lazy(() => import("~/pages/Profile"))
const SignUp = React.lazy(() => import("~/pages/Authentication/SignUp"))
const Home = React.lazy(() => import("~/pages/Home"))   
const VerifyAccount = React.lazy(() => import("~/pages/Authentication/VerifyAccount"))

export const publicRoutes = [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/signup", component: SignUp, layout: null },
    { path: "/login", component: Login, layout: null },
    { path: "/verifyAccount", component: VerifyAccount, layout: null },
    { path: "/about-us", component: AboutUs, layout: null },
    { path: "/contact", component: Contact, layout: null },
    { path: "/how-it-works", component: HowItWorks, layout: null },
];

export const privateRoutes = [];
