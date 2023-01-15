import React from "react";
const Login = React.lazy(() => import("~/pages/Authentication/LogIn"))
const Profile = React.lazy(() => import("~/pages/Profile"))
const SignUp = React.lazy(() => import("~/pages/Authentication/SignUp"))
const Home = React.lazy(() => import("~/pages/Home"))  


export const publicRoutes = [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/signup", component: SignUp, layout: null },
    { path: "/login", component: Login, layout: null },
];

export const privateRoutes = [];
