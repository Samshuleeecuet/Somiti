import React from 'react';
import DashBoardNavbar from '../Pages/Shared/DashBoardNavbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const DashBoardLayout = () => {
    return (
        <div>
            <DashBoardNavbar/>
            <Outlet/>
            <Toaster/>
        </div>
    );
};

export default DashBoardLayout;