import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./pages/router";
import axios from "axios";


function App() {
    axios.defaults.baseURL = "http://localhost:8080/";

    return <RouterProvider router={router}/>;
}

export default App;
