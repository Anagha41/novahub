import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

const EventApp = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    venue: "",
    organizerDetails: "",
  });
  const [editEventId, setEditEventId] = useState(null);
  const [editEventData, setEditEventData] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    venue: "",
    organizerDetails: "",
  });
  const [message, setMessage] = useState(""); // ✅ State for success/error message

  const apiBaseURL = "http://localhost:8080/api/events";

  useEffect(() => {
    fetchEvents();
  }, );

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/create`);
      setMessage("✅ Event created successfully!"); // ✅ Show success message
      console.log("Message Set:", message); // Debugging
      setTimeout(() => {
        setMessage("");
      }, 3000); // Hide after 3 seconds
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      await axios.post(`${apiBaseURL}/create`, newEvent);
      fetchEvents();
      setNewEvent({
        title: "",
        description: "",
        startdate: "",
        enddate: "",
        venue: "",
        organizerDetails: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleEditEvent = async (id) => {
    setEditEventId(id);
    const eventToEdit = events.find((event) => event.eventId === id);
    setEditEventData(eventToEdit);
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`${apiBaseURL}/event/${editEventId}`, editEventData);
      fetchEvents();
      setEditEventId(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${apiBaseURL}/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Create Event Form */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-lg mb-10 max-w-3xl mx-auto border border-gray-200">
        <h2 className="text-2xl font-bold text-[#2B1E59]">
          Create Event
        </h2>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            rows="4"
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newEvent.startdate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, startdate: e.target.value })
              }
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
             <input
              type="date"
              value={newEvent.enddate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, enddate: e.target.value })
              }
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Venue"
              value={newEvent.venue}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venue: e.target.value })
              }
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
         
          <input
            type="text"
            placeholder="Organizer Details"
            value={newEvent.organizerDetails}
            onChange={(e) =>
              setNewEvent({ ...newEvent, organizerDetails: e.target.value })
            }
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCreateEvent}
            className="w-full bg-[#372773] text-white font-semibold py-3 rounded-lg shadow hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Create Event
          </button>
        </form>
      </div>

      {/* Display Events */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-lg mb-10 max-w-3xl mx-auto border border-gray-200">
        <h2 className=" text-[#2B1E59] text-2xl font-bold">Event List</h2>
        {events.map((event) => (
          <div
            key={event.eventId}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            {editEventId === event.eventId ? (
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={editEventData.title}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      title: e.target.value,
                    })
                  }
                  className="block w-full p-2 border rounded"
                />
                <textarea
                  value={editEventData.description}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      description: e.target.value,
                    })
                  }
                  className="block w-full p-2 border rounded"
                ></textarea>
                <input
              type="date"
              value={newEvent.startdate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
             <input
              type="date"
              value={newEvent.enddate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
                <input
                  type="text"
                  value={editEventData.venue}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      venue: e.target.value,
                    })
                  }
                  className="block w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editEventData.organizerDetails}
                  onChange={(e) =>
                    setEditEventData({
                      ...editEventData,
                      organizerDetails: e.target.value,
                    })
                  }
                  className="block w-full p-2 border rounded"
                />
                <button
                  onClick={handleUpdateEvent}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditEventId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p>{event.description}</p>
                
                <p>
                  <strong>Start Date:</strong> {event.startdate}
                </p>
                <p>
                  <strong>End Date:</strong> {event.enddate}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p>
                  <strong>Organizer:</strong> {event.organizerDetails}
                </p>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEditEvent(event.eventId)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDeleteEvent(event.eventId)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventApp;
