import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Home";
import LoginPage from "./Login";
import DashboardPage from "./Dashboard";
import LeftMenuLayout from "../layouts/LeftMenuLayout";

export const router = createBrowserRouter([
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <LoginPage/>},
    {
        path: '/dashboard',
        element: <LeftMenuLayout/>,
        children: [
            {path: '', element: <DashboardPage/>},
        ]
    },
])