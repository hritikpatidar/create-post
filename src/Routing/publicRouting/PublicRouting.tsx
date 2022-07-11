import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const token = localStorage.getItem("token") == null ? false : true;
    return (
        <>
            { token ? <Navigate to="/Home"/> : <Outlet />}
        </>
    );
};

export default PublicRoute;


