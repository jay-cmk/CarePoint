import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const { Token, appointments, getAllAppointment, cancelAppointment } = useContext(AdminContext);
  const { calculatedAge } = useContext(AppContext);

  useEffect(() => {
    if (Token) {
      getAllAppointment();
    }
  }, [Token]);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 tracking-tight">
        All Appointments
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl hidden md:table border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <tr>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">#</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Patient</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Age</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Date & Time</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Doctor</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Fees</th>
              <th className="py-4 px-4 sm:px-6 text-left text-sm font-semibold tracking-wide">Status</th>
              <th className="py-4 px-4 sm:px-6 text-center text-sm font-semibold tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appt, index) => {
                const patientAge = appt.userData?.dob
                  ? calculatedAge(appt.userData.dob)
                  : "N/A";

                return (
                  <tr
                    key={appt._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">{index + 1}</td>

                    {/* Patient Name + Image */}
                    <td className="py-4 px-4 sm:px-6 flex items-center space-x-3">
                      <img
                        src={appt.userData?.image || "/default-avatar.png"}
                        alt="Patient"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 object-cover"
                      />
                      <span className="text-sm sm:text-base font-medium text-gray-800">
                        {appt.userData?.name || "N/A"}
                      </span>
                    </td>

                    {/* Age Calculation */}
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">{patientAge}</td>

                    {/* Appointment Date & Time */}
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">
                      {appt.slotDate} | {appt.slotTime}
                    </td>

                    {/* Doctor Name */}
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">{appt.docData?.name || "N/A"}</td>

                    {/* Fees */}
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">${appt.docData?.fees || "N/A"}</td>

                    {/* Status Column */}
                    <td className="py-4 px-4 sm:px-6">
                      {appt.cancelled ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                          Cancelled
                        </span>
                      ) : appt.isCompleted ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 sm:px-6 text-center space-x-2">
                      {!appt.cancelled && (
                        <button
                          onClick={() => cancelAppointment(appt._id)}
                          className="bg-red-500 text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-red-600 text-xs font-medium transition duration-200 transform hover:scale-105"
                        >
                          Cancel
                        </button>
                      )}
                      {!appt.isCompleted && !appt.cancelled && (
                        <button className="bg-green-500 text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-green-600 text-xs font-medium transition duration-200 transform hover:scale-105">
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-600 text-sm sm:text-base">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {appointments?.length > 0 ? (
            appointments.map((appt, index) => {
              const patientAge = appt.userData?.dob
                ? calculatedAge(appt.userData.dob)
                : "N/A";

              return (
                <div
                  key={appt._id}
                  className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={appt.userData?.image || "/default-avatar.png"}
                      alt="Patient"
                      className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-base text-gray-800">{appt.userData?.name || "N/A"}</p>
                      <p className="text-xs text-gray-500">#{index + 1}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <p><span className="font-semibold text-gray-900">Age:</span> {patientAge}</p>
                    <p><span className="font-semibold text-gray-900">Doctor:</span> {appt.docData?.name || "N/A"}</p>
                    <p><span className="font-semibold text-gray-900">Date:</span> {appt.slotDate}</p>
                    <p><span className="font-semibold text-gray-900">Time:</span> {appt.slotTime}</p>
                    <p><span className="font-semibold text-gray-900">Fees:</span> ${appt.docData?.fees || "N/A"}</p>
                    <p>
                      <span className="font-semibold text-gray-900">Status:</span>{" "}
                      {appt.cancelled ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                          Cancelled
                        </span>
                      ) : appt.isCompleted ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    {!appt.cancelled && (
                      <button
                        onClick={() => cancelAppointment(appt._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 text-xs font-medium transition duration-200 transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    )}
                    {!appt.isCompleted && !appt.cancelled && (
                      <button className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 text-xs font-medium transition duration-200 transform hover:scale-105">
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-gray-600 text-sm bg-white rounded-xl shadow-lg">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;