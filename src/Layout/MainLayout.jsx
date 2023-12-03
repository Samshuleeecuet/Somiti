import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Toaster/>
        </div>
    );
};

export default MainLayout;