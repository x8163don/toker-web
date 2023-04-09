import {createBrowserRouter} from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import DashboardPage from "./dashboard";

export const router = createBrowserRouter([
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/dashboard', element: <DashboardPage/>},
])