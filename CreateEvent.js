
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
    venue: "",
    organizerDetails: "",
    department: "",
    eventDate: "",
    status: "Upcoming",  // Set default status to "Upcoming"
  });
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Include status when sending the formData
      });
  
      if (response.ok) {
        alert("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          startdate: "",
          enddate: "",
          venue: "",
          organizerDetails: "",
          department: "",
          eventDate: "",
          status: "Upcoming", // Reset status to "Upcoming" after submission
        });
      } else {
        alert("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };
 
  
//delete eevnts
const handleDelete = async (eventId) => {
  try {
    await axios.delete(`http://localhost:8080/api/events/${eventId}`);
    alert("Event deleted successfully!");
    fetchEvents();
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Failed to delete event.");
  }
};
const handleEdit = (event) => {
  setEditingEventId(event.id);
  setFormData({
    ...event,
    // Make sure status is updated from the fetched event
    status: event.status || "Upcoming",
  });
};
const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:8080/api/events/${editingEventId}`, formData); // Fix the URL for updating
    alert("Event updated successfully!");
    fetchEvents();
    setEditingEventId(null);
    setFormData({
      title: "",
      description: "",
      startdate: "",
      enddate: "",
      venue: "",
      organizerDetails: "",
      department: "",
      eventDate: "",
      status: "Upcoming", // Reset after update
    });
  } catch (error) {
    console.error("Error updating event:", error);
    alert("Failed to update event.");
  }
};
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">Create New Event</h2>
      <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter event title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Provide a detailed description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          ></textarea>
        </div>

        {/* Date, Start Time, and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              id="startdate"
              type="date"
              value={formData.startdate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              id="enddate"
              type="date"
              value={formData.enddate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            placeholder="Enter venue details"
            value={formData.venue}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Organizer Details */}
        <div>
          <label htmlFor="organizerDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Organizer Details
          </label>
          <textarea
            id="organizerDetails"
            placeholder="Enter organizer name and contact info"
            rows="3"
            value={formData.organizerDetails}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          ></textarea>
        </div>

        {/* Department Dropdown */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          >
            <option value="">Select Department</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCom">BCom</option>
            <option value="BSW">BSW</option>
            <option value="MCA">MCA</option>
            <option value="MCom">MCom</option>
            <option value="MSW">MSW</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        {/* Registration Deadline */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
          Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
        >
          Create Event
        </button>
      </form>
      <h3 className="text-2xl font-bold text-purple-600 mt-10">Created Events</h3>
      <div className="mt-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 border rounded-lg shadow">
            <h4 className="text-xl font-semibold">{event.title}</h4>
            <p className="text-gray-700">{event.description}</p>
            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleEdit(event)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateEvent;
