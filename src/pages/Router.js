import {createBrowserRouter} from "react-router-dom";
import HomePage from "./Home";
import LoginPage from "./Login";
import DashboardPage from "./Dashboard";
import CustomersPage from "./Customers";
import Customer from "./Customer";
import SideMenuLayout from "../layouts/SideMenuLayout";
import Account from "./Account";

export const router = createBrowserRouter([
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <LoginPage/>},
    {
        path: '/dashboard',
        element: <SideMenuLayout/>,
        children: [
            {path: '', element: <DashboardPage/>},
        ]
    },
    {
        path: '/customers',
        element: <SideMenuLayout/>,
        children: [
            {path: '', element: <CustomersPage/>},
            {path: ':id', element: <Customer/>},
        ]
    },
    {
        path: '/account',
        element: <SideMenuLayout/>,
        children: [
            {path: '', element: <Account/>}
        ]
    }
])