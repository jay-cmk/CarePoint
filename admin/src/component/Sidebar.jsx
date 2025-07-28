import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const { Token, setAtoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!Token && !dToken) return null; // Hide sidebar if no one is logged in

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("dToken");
    setDToken("");
    setAtoken("");
    toast.success("✅ Logged out successfully!");
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden fixed top-2 left-2 z-50 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-105"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-white text-gray-900 p-4 mt-16 sm:mt-16 w-64 sm:w-72 flex flex-col shadow-md transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <ul className="space-y-4 flex-1">
          {/* Admin Sidebar */}
          {Token && (
            <>
              <NavLink
                to={"/admin-dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
                <p className="text-sm sm:text-base">Admin Dashboard</p>
              </NavLink>

              <NavLink
                to={"/all-appointment"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={assets.appointment_icon}
                  alt="Appointments"
                  className="w-6 h-6"
                />
                <p className="text-sm sm:text-base">All Appointments</p>
              </NavLink>

              <NavLink
                to={"/add-doctor"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
                <p className="text-sm sm:text-base">Add Doctor</p>
              </NavLink>

              <NavLink
                to={"/doctor-list"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={assets.list_icon}
                  alt="Doctor List"
                  className="w-6 h-6"
                />
                <p className="text-sm sm:text-base">Doctor List</p>
              </NavLink>
            </>
          )}

          {/* Doctor Sidebar */}
          {dToken && (
            <>
              <NavLink
                to={"/doctor-dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
                <p className="text-sm sm:text-base">Doctor Dashboard</p>
              </NavLink>

              <NavLink
                to={"/doctor-appointments"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={assets.appointment_icon}
                  alt="Appointments"
                  className="w-6 h-6"
                />
                <p className="text-sm sm:text-base">My Appointments</p>
              </NavLink>

              <NavLink
                to={"/doctor-profile"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={assets.list_icon}
                  alt="Patient List"
                  className="w-6 h-6"
                />
                <p className="text-sm sm:text-base">Profile</p>
              </NavLink>
            </>
          )}
        </ul>

        {/* Logout Button */}
        {(Token || dToken) && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 mt-4"
          >
            Logout
          </button>
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;