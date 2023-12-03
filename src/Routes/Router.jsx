import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Upload from "../Pages/Upload/Upload";


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
        }
      ]
    },
  ]);


  export default router