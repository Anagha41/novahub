import React, { useState } from "react";
import { Calendar, UserPlus, LogOut, UserCog, User } from "lucide-react";
import UserEvents from "./UserEvents"; // Import your components
import ProfileCreate from "./ProfileCreate";
import ProfileUpdate from "./ProfileUpdate";
import ProfileDisplay from "./ProfileDisplay";
import Logout from "./Logout";

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState("UserEvents");

  const renderPage = () => {
    switch (currentPage) {
      case "UserEvents":
        return <UserEvents />;
      case "ProfileCreate":
        return <ProfileCreate />;
      case "ProfileUpdate":
        return <ProfileUpdate />;
      case "ProfileDisplay":
        return <ProfileDisplay />;
      case "Logout":
        return <Logout />;
      default:
        return <UserEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-200">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white/95 backdrop-blur-sm shadow-xl h-screen sticky top-0">
          <div className="px-6 py-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold flex items-center">
              <img src="/nova.png" alt="NOVA HUB Logo" className="h-13 mr-2" />
            </h1>
          </div>

          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage("UserEvents")}
                  className="flex items-center px-6 py-4 text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:border-r-4 hover:border-purple-600 group"
                >
                  <Calendar className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Events</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentPage("ProfileCreate")}
                  className="flex items-center px-6 py-4 text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:border-r-4 hover:border-purple-600 group"
                >
                  <UserPlus className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Add Profile</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentPage("ProfileUpdate")}
                  className="flex items-center px-6 py-4 text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:border-r-4 hover:border-purple-600 group"
                >
                  <UserCog className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Update Profile</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentPage("ProfileDisplay")}
                  className="flex items-center px-6 py-4 text-gray-600 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 hover:border-r-4 hover:border-purple-600 group"
                >
                  <User className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">View Profile</span>
                </button>
              </li>

              <li className="mt-auto">
                <button
                  onClick={() => setCurrentPage("Logout")}
                  className="flex items-center px-6 py-4 text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-r-4 hover:border-red-600 group"
                >
                  <LogOut className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to NOVA HUB
              </h1>
              <p className="text-lg text-white/80">
                Explore upcoming events, view winners, and share your feedback.
              </p>
            </header>
            <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-200">
      <div className="flex h-full">

            {/* Display the current page component */}
            <main>{renderPage()}</main>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
