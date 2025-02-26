import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import AllFood from "../Pages/AllFood/AllFood";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ViewDetails from "../Pages/AllFoodSection/ViewDetails";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Gallery from "../Pages/Gallery/Gallery";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PurchesPage from "../Pages/PurchesPage/PurchesPage";
import UpdateItems from "../Pages/MyProfile/UpdateItems";
import UpdateMyOrderedData from "../Pages/MyProfile/UpdateMyOderderdData";
import ChatPage from "../Pages/ChatPage/ChatPage";

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
        {
          path: "/chatPage",
          element: <ChatPage />,
        },
        {
          path: "/myProfile",
          element: <PrivateRoute><MyProfile /></PrivateRoute>,
        },
        {
          path: "/gallery",
          element: <PrivateRoute><Gallery /></PrivateRoute>,
        },
        {
          path: "/purchesPage/:id",
          element: <PrivateRoute><PurchesPage /></PrivateRoute>,
          loader:  ({ params }) => fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/${params.id}`)
        },
        {
          path: "/viewDetails/:id",
          element: <ViewDetails />,
          loader:  ({ params }) => fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/${params.id}`)
        },
        {
          path: "/updateItems/:id",
          element: <UpdateItems />,
          loader:  ({ params }) => fetch(`https://taste-journey-server-side.vercel.app/TasteJourneyAllFood/${params.id}`)
        },
        {
          path: '/updateMyOrderItems/:id',
          element:<UpdateMyOrderedData/>,
          loader: ({ params }) => fetch(`https://taste-journey-server-side.vercel.app/purchase/${params.id}`)
        }
      ],
    },
  ]);