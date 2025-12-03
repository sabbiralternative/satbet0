// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import ApiProvider from "./context/ApiProvider.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LanguageProvider from "./context/LanguageProvider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ApiProvider>
    <LanguageProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </LanguageProvider>
    <Toaster containerStyle={{ zIndex: 9999999 }} />
  </ApiProvider>
  // </StrictMode>
);
