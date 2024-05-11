import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import AllFood from "../Pages/AllFood/AllFood";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/logIn",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <Signup />,
        },
        {
          path: "/allFoods",
          element: <AllFood />,
        },
        {
          path: "/contactUs",
          element: <ContactUs />,
        },
        {
          path: "/aboutUs",
          element: <AboutUs />,
        },
      ],
    },
  ]);