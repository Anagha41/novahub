import React, { useState } from "react";
import { 
  Plus, 
  Home, 
  User, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Activity,
  FileEdit,
  Eye,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import { Link } from "react-router-dom";

const CoordinatorDashboard = () => {
  const [activeSection, setActiveSection] = useState("landing");
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    setActiveSection("createEvent");
  };

  const handleProfileClick = () => {
    navigate("/ProfileCreate");
  };

  const handleEventDashboard = () => {
    navigate("/EventsDashboard");
  };

  const statsCards = [
    { title: "Total Events", value: "24", icon: Calendar, color: "bg-blue-500" },
    { title: "Active Users", value: "156", icon: Users, color: "bg-green-500" },
    { title: "Upcoming Events", value: "8", icon: Clock, color: "bg-purple-500" },
    { title: "Event Rating", value: "4.8", icon: Star, color: "bg-yellow-500" },
  ];

  const recentEvents = [
    { id: 1, name: "Tech Conference 2025", date: "Mar 15", attendees: 120, status: "Upcoming" },
    { id: 2, name: "Career Fair", date: "Mar 20", attendees: 250, status: "Planning" },
    { id: 3, name: "Workshop Series", date: "Mar 25", attendees: 75, status: "Confirmed" },
  ];

  const renderLandingView = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Coordinator!</h1>
        <p className="text-gray-600">Here's what's happening with your events today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
                <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleCreateEvent}
          className="flex items-center justify-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-300"
        >
          <Plus className="h-6 w-6 text-purple-600 mr-2" />
          <span className="text-purple-600 font-medium">Create New Event</span>
        </button>
        <button
          onClick={handleEventDashboard}
          className="flex items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300"
        >
          <Activity className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-blue-600 font-medium">View All Events</span>
        </button>
      </div>

      {/* Recent Events Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.attendees}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 
                      event.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Profile</h2>
      <p className="text-gray-600">
        This is the profile page where user information will be displayed.
      </p>
    </div>
  );

  const renderCreateEvent = () => <CreateEvent />;

  const renderContent = () => {
    switch (activeSection) {
      case "landing":
        return renderLandingView();
      case "profile":
        return renderProfile();
      case "createEvent":
        return renderCreateEvent();
      default:
        return (
          <div className="p-6 text-gray-600">
            Select a section from the sidebar.
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-[#5C4F8C] shadow-lg transition-all duration-300 fixed inset-0 z-10">
        <div className="p-6 border-b border-purple-700">
          <h1 className="text-3xl font-bold flex items-center">
            <img src="/nova.png" alt="NOVA HUB Logo" className="h-13 mr-2" />
          </h1>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "landing"
                  ? "bg-white text-purple-800"
                  : "text-white hover:bg-[#372773]"
              }`}
              onClick={() => setActiveSection("landing")}
            >
              <Home size={18} /> Home
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "profile"
                  ? "bg-white text-purple-800"
                  : "text-[#D9CE9A] hover:bg-[#372773] hover:text-white"
              }`}
              onClick={handleProfileClick}
            >
              <User size={18} /> Profile
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeSection === "eventsDashboard"
                  ? "bg-white text-purple-800"
                  : "text-white hover:bg-[#372773]"
              }`}
              onClick={handleEventDashboard}
            >
              <Calendar size={18} /> Event Dashboard
            </button>

            <Link
              to="/ProfileUpdate"
              className="flex items-center text-white hover:bg-[#372773] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <FileEdit className="mr-2" size={18} />
              Update Profile
            </Link>

            <Link
              to="/ProfileDisplay"
              className="flex items-center text-white hover:bg-[#372773] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Eye className="mr-2" size={18} />
              View Profile
            </Link>

            <Link
              to="/CreateEvent"
              className="flex items-center text-white hover:bg-[#372773] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Plus className="mr-2" size={18} />
              Create Events
            </Link>

            <Link
              to="/Logout"
              className="flex items-center text-white hover:bg-[#372773] font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default CoordinatorDashboard;