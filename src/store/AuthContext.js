import React, {useEffect, useState} from 'react'
import {authCheck} from "../data/account/account";
import { StatusCode } from 'status-code-enum'


export const AuthContext = React.createContext({
    isLoggingIn: false,
    token: "",
    onLogin: () => {
    },
    onLogout: () => {
    },
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        authCheck().catch(e => {
            if (e.response.status === StatusCode.ClientErrorUnauthorized) {
                logoutHandler()
            }
        })
    }, [])

    const loginHandler = (token) => {
        setIsLoggedIn(true)
        setToken(token)
        localStorage.setItem("token", token)
    }

    const logoutHandler = () => {
        setIsLoggedIn(false)
        setToken(null)
        localStorage.removeItem("token")
    }

    return <AuthContext.Provider value={{
        isLoggingIn: isLoggedIn,
        token: token,
        onLogin: loginHandler,
        onLogout: logoutHandler
    }}>{props.children}</AuthContext.Provider>
}


