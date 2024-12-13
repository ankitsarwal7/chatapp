import {  createBrowserRouter    } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import RegisterPage from "../pages/registerPage";
import CheckEmailPage from "../pages/checkEmailPage";
import CheckPasswordPage from "../pages/checkPasswordPage";
import MessagePage from "../componenets/messagePage";
// import AuthLayout from "../layout";
// import AuthLayout from "../layout/AuthLayout"; // Corrected import for layout
  import AuthLayout from "../layout/";




const router = createBrowserRouter([

{
    path: "/",
    element : <App/>,
    children : [
        {
            path: "register",
            element: <AuthLayout><RegisterPage/></AuthLayout>
        },
    {
        path: "email",
            element: <AuthLayout><CheckEmailPage/></AuthLayout>
    },
    {
        path: "password",
            element: <AuthLayout><CheckPasswordPage/></AuthLayout>
    },
    {
        path: "",
        element: <Home/>,
        children: [
            {
                path: ":userId",
                element: <MessagePage/>
            }
        ]
    }
    ]
}



])

export default router