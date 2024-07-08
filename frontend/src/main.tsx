import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persistor, store } from "./redux/store";
import router from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <NextUIProvider>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster
              visibleToasts={10}
              richColors={true}
              toastOptions={{
                style: {
                  background: "mediumseagreen",
                  color: "white",
                  fontSize: "16px",
                  padding: "16px",
                  borderRadius: "6px",
                },
              }}
            />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </NextUIProvider>
  </HelmetProvider>
);
