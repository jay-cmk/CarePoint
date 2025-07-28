import React, { useContext } from 'react';
import { assets } from '../assets/assets/';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { Token } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <nav className="bg-white shadow-md w-full p-3 sm:p-4 flex justify-between items-center fixed top-0 z-50">
            {/* Logo & Role */}
            <div className="flex items-center space-x-2 sm:space-x-3">
                <img src={assets.admin_logo} alt="Admin Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                <p className="text-base sm:text-lg font-semibold text-gray-800 px-2 border rounded-full">
                    {Token ? 'Admin' : dToken ? 'Doctor' : ''}
                </p>
            </div>
        </nav>
    );
};

export default Navbar;