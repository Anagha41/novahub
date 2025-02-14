import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState("coming");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events/create")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-purple-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex flex-wrap justify-center gap-3 mb-12">
          <a
            href="/AdminEvents"
            className="px-5 py-2.5 rounded-lg font-medium bg-pink-300 text-white hover:bg-purple-400 transition-all  shadow-blue-500/30"
          >
            Admin Events
          </a>
          <button
            onClick={() => setViewMode("all")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === "all"
                ? "bg-pink-300 text-white shadow-lg shadow-blue-500/30"
                : "bg-pink-300 text-white shadow-lg  hover:bg-purple-400 transition-all"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setViewMode("coming")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === "coming"
                ? "bg-pink-300 text-white shadow-lg shadow-blue-500/30"
                : "bg-pink-300 text-white shadow-lg  hover:bg-purple-400 transition-all"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setViewMode("past")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              viewMode === "past"
                ? "bg-pink-300 text-white shadow-lg shadow-blue-500/30"
                : "bg-pink-300 text-white shadow-lg  hover:bg-purple-400 transition-all"
            }`}
          >
            Past Events
          </button>
          <a
            href="/UserDashboard"
            className="px-5 py-2.5 rounded-lg font-medium bg-pink-300 text-white hover:bg-purple-400 transition-all  shadow-blue-500/30"
          >
            Dashboard
          </a>
        </nav>
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-500">
          Admin Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.eventId}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-3">{event.description}</p>
                <p className="text-gray-700">
                  {" "}
                  <span className="text-blue-500 mr-3">📅</span>
                  <strong>Start Date:</strong> {event.startdate}
                </p>
                <p className="text-gray-700">
                  <strong>
                    {" "}
                    <span className="text-blue-500 mr-3">📅</span>
                    End Date:
                  </strong>{" "}
                  {event.enddate}
                </p>
                <p className="text-gray-700">
                  <span className="text-blue-500 mr-3">📍</span>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p className="text-gray-700">
                  <span className="text-blue-500 mr-3">👤</span>
                  <strong>Organizer:</strong> {event.organizerDetails}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No events available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
