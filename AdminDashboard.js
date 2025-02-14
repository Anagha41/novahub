import React, { useState } from "react";
import {
  Home,
  PlusCircle,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import EventApp from "./EventApp";
import EventsDashboardAdmin from "./EventsDashboardAdmin";
import UserList from "./UserList";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("events");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "events":
        return <EventsDashboardAdmin />;
      case "createEvent":
        return <EventApp />;
      case "userList":
        return <UserList />;
      default:
        return (
          <div className="p-6 text-[#2B1E59]">
            Select a section from the sidebar.
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#D9CE9A] to-[#8177A6]">
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-[#5C4F8C] shadow-lg transition-all duration-300 fixed inset-0 z-10`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#8177A6]">
          <h1 className="text-3xl font-bold flex items-center">
            <img src="/nova.png" alt="NOVA HUB Logo" className="h-13 mr-2" />
          </h1>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-[#D9CE9A] hover:text-white transition-colors duration-200"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <nav className="p-4">
          <div className="space-y-4">
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "createEvent"
                  ? "bg-[#372773] text-white"
                  : "text-[#D9CE9A] hover:bg-[#372773] hover:text-white"
              }`}
              onClick={() => setActiveSection("createEvent")}
            >
              <PlusCircle size={18} />
              {!isSidebarCollapsed && "Create Event"}
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "events"
                  ? "bg-[#372773] text-white"
                  : "text-[#D9CE9A] hover:bg-[#372773] hover:text-white"
              }`}
              onClick={() => setActiveSection("events")}
            >
              <Home size={18} />
              {!isSidebarCollapsed && "Events"}
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "userList"
                  ? "bg-[#372773] text-white"
                  : "text-[#D9CE9A] hover:bg-[#372773] hover:text-white"
              }`}
              onClick={() => setActiveSection("userList")}
            >
              <Users size={18} />
              {!isSidebarCollapsed && "Manage Users"}
            </button>

            <div className="pt-4 mt-4 border-t border-[#8177A6]">
              <a
                href="/Logout"
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-[#D9CE9A] hover:bg-[#372773] hover:text-white"
              >
                <FaSignOutAlt size={18} />
                {!isSidebarCollapsed && "Logout"}
              </a>
            </div>
          </div>
        </nav>
      </aside>
      <main
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-auto transition-all duration-300`}
      >
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
