import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "react-use";

const ProtectedRoute = () => {
    const [token,setToken] = useState(localStorage.getItem('token'));

    if (token==undefined) {
        console.log("REtornar login")
        return <Navigate to={"/login"}/>
    }
    console.log("Token valido")
    return <Outlet />;
}

export default ProtectedRoute;