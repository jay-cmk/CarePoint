import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserMd, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
  const { dashData, getDashData } = useContext(AdminContext);

  useEffect(() => {
    getDashData(); // Fetch dashboard data when component loads
  }, []);
  console.log(dashData);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Admin Dashboard</h1>

      {dashData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Doctors */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-600">Doctors</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{dashData.doctors}</p>
            </div>
            <FaUserMd className="text-blue-500 text-3xl sm:text-4xl" />
          </div>

          {/* Appointments */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-600">Appointments</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{dashData.appointments}</p>
            </div>
            <FaCalendarCheck className="text-purple-500 text-3xl sm:text-4xl" />
          </div>

          {/* Patients */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-600">Patients</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{dashData.patients}</p>
            </div>
            <FaUsers className="text-green-500 text-3xl sm:text-4xl" />
          </div>

          {/* Latest Appointments */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-4 sm:p-6 shadow-md rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarCheck className="text-blue-500" /> Latest Appointments
            </h2>

            <ul className="mt-4">
              {dashData.latestAppointments?.length > 0 ? (
                dashData.latestAppointments.map((appt, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={appt.docData.image}
                        alt="Doctor"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-700 text-sm sm:text-base">
                          {appt.patientName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">Booking on {appt.slotDate}</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:bg-red-100 p-2 rounded-full mt-2 sm:mt-0">
                      <IoMdClose className="text-lg sm:text-xl" />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">No recent appointments</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center text-sm sm:text-base">Loading dashboard data...</p>
      )}
    </div>
  );
};

export default Dashboard;