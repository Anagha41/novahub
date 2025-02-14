import React, { useState, useEffect } from "react";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [className, setClassName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profimg, setProfimg] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        const { username, department, rollNumber, className, phoneNumber, profimg } = data;
        setUsername(username);
        setDepartment(department);
        setRollNumber(rollNumber);
        setClassName(className);
        setPhoneNumber(phoneNumber);
        setProfimg(profimg);
      } catch (error) {
        setError("Error fetching profile data for update.");
      }
    };

    fetchProfile();
  }, [userId]);

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
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:8080/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          department,
          rollNumber,
          className,
          phoneNumber,
          profimg
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccessMessage("Profile Updated Successfully! ✨");
      setTimeout(() => {
        window.location.href = "/ProfileDisplay";
      }, 1000);
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  return (
     
      <main >
                <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center text-[#5B4A8C] mb-8">Update Profile</h2>
          
          {error && (
            <div className="text-sm text-red-600 mb-4 text-center font-semibold">{error}</div>
          )}
          
          {successMessage && (
            <div className="text-sm text-green-600 mb-4 text-center font-semibold">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Preview */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <img
                  src={profimg || "/api/placeholder/128/128"}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#C5C2F2] shadow-lg"
                />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
              <input
                type="number"
                placeholder="Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-[#C5C2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4F8C] bg-white/50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C5C2F2] to-[#BFB9E8] text-white p-3 rounded-lg font-semibold hover:from-[#BFB9E8] hover:to-[#C5C2F2] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Update Profile ✨
            </button>
          </form>
          </div>
      </main>
  );
};

export default ProfileUpdate;