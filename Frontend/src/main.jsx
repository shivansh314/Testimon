import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Signup from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx"
import UpdateSpace from "./pages/UpdateSpace.jsx"
import CreateSpace from "./pages/CreateSpace.jsx"
import Home from "./pages/Home.jsx"
import HomeOut from "./pages/HomeOut.jsx"

import ReviewForm from "../src/components/forms/ReviewForm.jsx"
import Dashboard from "./components/dashboard/Dashboard.jsx"
import Reviews from "./pages/Reviews.jsx"

import store from "./store/store.js";
import AuthLayout from "./components/AuthLayout.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication = {true}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/homeout",
        element: (
          // <AuthLayout authentication = {false}>
          //   {" "}
            <HomeOut />
          // </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          // <AuthLayout authentication={false}>
            <Signup />
          // </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/updatespace/:spaceId",
        element: (
          // <AuthLayout authentication={true}>
            <UpdateSpace />
          // </AuthLayout>
        ),
      },
      {
        path: "/createspace",
        element: (
          // <AuthLayout authentication={true}>
            <CreateSpace />
          // </AuthLayout>
        ),
      },
      {
        path: `/reviews/createReview/:spaceId`,
        element: (
          // <AuthLayout authentication={true}>
            <ReviewForm />
          // </AuthLayout>
        ),
      },
      {
        path: `/reviews/getReviews/:spaceId`,
        element: (
          // <AuthLayout authentication={true}>
          <Reviews />
          // </AuthLayout>
        ),
      },
      {
        path: `/dashboard`,
        element: (
          // <AuthLayout authentication={true}>
          <Dashboard />
          // </AuthLayout>
        ),
      },
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
