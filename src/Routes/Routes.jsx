import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root/Root";
import Listing from "../pages/Listing/Listing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HouseDetails from "../pages/HouseDetails/HouseDetails";
import Favourites from "../pages/Favourites/Favourites";
import Error from "../pages/Error/Error";
import UserProfile from "../pages/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/listing",
                element: <Listing></Listing>
            },
            {
                path: "/favourites",
                element: <Favourites></Favourites>
            },
            {
                path: "/profile",
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
            },
            {
                path: "/details/:id",
                element: <HouseDetails></HouseDetails>
            },

        ]
    },
]);

export default router;