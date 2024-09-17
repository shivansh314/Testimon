import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import LoginForm from "./components/LoginForm.jsx";
import SignUp from "./components/SignUp.jsx";
import SpaceForm from "./components/space/SpaceForm.jsx";

import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path : "/spaceform",
        element : <SpaceForm />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
