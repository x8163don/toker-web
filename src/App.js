import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Router";
import axios from "axios";
import { AuthContextProvider } from "./store/AuthContext";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
