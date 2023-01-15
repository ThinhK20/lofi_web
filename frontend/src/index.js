import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "~/components/GlobalStyles";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./components/Redux/store"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>  
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </Provider>
            </QueryClientProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
