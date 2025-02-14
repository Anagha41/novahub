import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCreate = () => {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [className, setClassName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profimg, setProfimg] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();
  const userId = localStorage.getItem("id");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfimg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/profile", {
        user: { id: userId },
        username,
        department,
        rollNumber,
        className,
        phoneNumber,
        profimg,
      });
      setMessage("Profile Created Successfully!");
      setError(""); // Clear error if success

      // Redirect after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        history("/ProfileDisplay");
      }, 1000);
    } catch (error) {
      setError("You have already created your profile!");
      setMessage(""); // Clear message if error occurs
    }
  };

  return (
    <div >
     
      {/* Main Content */}
      <main >
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#5B4A8C] mb-8">Create Profile</h2>
          {error && (
            <div className="text-sm text-red-600 mb-4 text-center font-semibold">{error}</div>
          )}
            {/* Success Message */}
            {message && (
            <div className="text-sm text-green-600 mb-4 text-center font-semibold">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent placeholder:text-[#7A739E] transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent placeholder:text-[#7A739E] transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent placeholder:text-[#7A739E] transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent placeholder:text-[#7A739E] transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent placeholder:text-[#7A739E] transition-all duration-200"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-4 bg-[#E5E2F9] border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFB9E8] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#7A739E] file:text-white hover:file:bg-[#5B4A8C] transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C5C2F2] to-[#BFB9E8] text-white p-4 rounded-lg font-semibold hover:from-[#BFB9E8] hover:to-[#C5C2F2] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Create Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileCreate;