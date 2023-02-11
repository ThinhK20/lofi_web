import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { publicRoutes } from "./routes";
import NotFound from "./pages/Error/NotFound";
import Loading from "./pages/Loading";

import { DefaultLayout } from "./components/layout";

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <ToastContainer />
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Suspense>
    );
}

export default App;
