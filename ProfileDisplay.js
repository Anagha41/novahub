import React, { useState, useEffect } from "react";

const ProfileDisplay = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/profile/${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError("profile not created yet.");
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div >
      {/* Main Content */}
      <main className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          {error && (
            <div className="text-sm text-red-600 mb-4 text-center font-semibold">{error}</div>
          )}

          {profile ? (
            <div className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6">
                  <img
                    src={profile.profimg}
                    alt="Profile"
                    className="w-40 h-40 object-cover rounded-full border-4 border-[#C5C2F2] shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-[#5B4A8C] mb-2">{profile.username}</h2>
                <p className="text-[#7A739E] text-xl">{profile.department}</p>
              </div>

              {/* Profile Details */}
              <div className="space-y-6 bg-gray-50 p-8 rounded-xl">
                <div className="flex justify-between items-center text-lg">
                  <strong className="text-[#7A739E]">Roll Number:</strong>
                  <span className="text-[#5B4A8C] font-semibold">{profile.rollNumber}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <strong className="text-[#7A739E]">Class:</strong>
                  <span className="text-[#5B4A8C] font-semibold">{profile.className}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <strong className="text-[#7A739E]">Phone Number:</strong>
                  <span className="text-[#5B4A8C] font-semibold">{profile.phoneNumber}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#7A739E] text-lg py-12">Loading...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileDisplay;