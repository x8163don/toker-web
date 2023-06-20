import {useContext, useEffect} from 'react'
import {Navigate} from "react-router-dom";
import axios from "axios";

import _ from 'lodash'
import {AuthContext} from "../store/AuthContext";

const ProtectedRoute = (props) => {
    const authCtx = useContext(AuthContext)

    if (_.isEmpty(authCtx.token)) {
        authCtx.onLogout()
        return <Navigate to="/login"/>
    }

    return props.children
}

export default ProtectedRoute