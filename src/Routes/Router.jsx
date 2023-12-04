import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Upload from "../Pages/Upload/Upload";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Profile from "../Pages/DashBoard/Profile/Profile";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/upload',
            element:<Upload/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path: '/register',
          element:<SignUp/>
        }
      ]
    },
    {
      path: 'dashboard',
      element:<DashBoardLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'',
          element:<Profile/>
        }
      ]
    }
  ]);


  export default router