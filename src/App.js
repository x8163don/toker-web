import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./pages/Router";
import axios from "axios";


function App() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

    return <RouterProvider router={router}/>;
}

export default App;
