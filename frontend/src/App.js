import { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "~/components/layout";
import NotFound from "./pages/Error/NotFound"; 
import Loading from "./pages/Loading";


function App() {
    return (  
        <Suspense fallback={<Loading/>}>

            <Router>
                <div className="App">
                    <Routes>  
                        <Route path="*" element={<NotFound/>}/>
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