import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [address1, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, Token } = useContext(AdminContext);

  const submitHandle = async (e) => {
    e.preventDefault();

    if (!docImg) {
      return toast.error("Please select an image!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("degree", degree);
    formData.append("speciality", speciality);
    formData.append("fees", Number(fees));
    formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
    formData.append("image", docImg);

    for (let [key, value] of formData.entries()) {
      console.log(`${key} :`, value instanceof File ? value.name : value);
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Token,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1");
        setAbout("");
        setDegree("");
        setSpeciality("General Physician");
        setFees("");
        setAddress("");
        setAddress2("");
        setDocImg(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
    }
  };

  return (
    <form
      onSubmit={submitHandle}
      className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 mt-4 sm:mt-4 space-y-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center">
        Add New Doctor
      </h2>

      {/* Upload Section */}
      <div className="flex items-center justify-center space-x-4">
        <label
          htmlFor="doc-img"
          className="cursor-pointer group relative"
        >
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-2 border-gray-300 group-hover:border-blue-500 transition duration-200 shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-blue-500 bg-opacity-50 rounded-full">
            <span className="text-white text-xs font-medium">Upload</span>
          </div>
        </label>
        <input
          type="file"
          id="doc-img"
          hidden
          onChange={(e) => setDocImg(e.target.files[0])}
        />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">Upload Doctor Picture</p>
          <p className="text-xs text-gray-500">JPG, PNG, or JPEG</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Doctor Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Doctor Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* Speciality Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Speciality</label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          >
            <option>General Physician</option>
            <option>Gynecologist</option>
            <option>Dermatologist</option>
            <option>Pediatrician</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        {/* Fees */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Consultation Fee ($)</label>
          <input
            type="number"
            placeholder="Enter Fee"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* Experience Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Experience (Years)</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6+</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Education</label>
          <input
            type="text"
            placeholder="Degrees & Certifications"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">Address</label>
          <input
            type="text"
            placeholder="Street Address"
            value={address1}
           an
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
          <input
            type="text"
            placeholder="City, State, Zip"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm"
          />
        </div>

        {/* About Me */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">About Me</label>
          <textarea
            placeholder="Write about the doctor..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white shadow-sm min-h-[120px]"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 transform hover:scale-105 shadow-md"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;