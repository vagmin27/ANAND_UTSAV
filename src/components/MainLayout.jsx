import React from "react";
import Navbar from "./Navbar"; // Your Navbar component
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Navbar />    {/* Navbar shown here */}
            <Outlet />    {/* Page content rendered here */}
        </>
    );
};

export default MainLayout;
