import React, { useEffect, useState } from "react";

const EventsDashboardAdmin = () => {
  const [events, setEvents] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState("coming");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        const adminResponse = await fetch(
          "http://localhost:8080/api/events/create"
        );

        if (response.ok && adminResponse.ok) {
          const eventsData = await response.json();
          const adminEventsData = await adminResponse.json();
          setEvents(eventsData);
          setAdminEvents(adminEventsData);
        } else {
          setError("Failed to fetch events or admin events");
        }
      } catch (error) {
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const fetchEventDetails = async (id, isAdminEvent = false) => {
    setLoading(true);
    try {
      const endpoint = isAdminEvent
        ? `http://localhost:8080/api/events/create/${id}`
        : `http://localhost:8080/api/events/${id}`;
      const response = await fetch(endpoint);

      if (response.ok) {
        const data = await response.json();
        setSelectedEvent(data);

        const registrationsResponse = await fetch(
          `http://localhost:8080/api/registrations/event/${id}`
        );
        if (registrationsResponse.ok) {
          const registrationsData = await registrationsResponse.json();
          setRegistrations(registrationsData);
        } else {
          setRegistrations([]);
        }
      } else {
        setError("Failed to fetch event details");
      }
    } catch (error) {
      setError("Error fetching event details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setRegistrations([]);
  };

  const filterEvents = (eventsData) => {
    const now = new Date();
    return eventsData.filter((event) => {
      const eventDate = new Date(event.startDate);
      
      if (filter === "coming") {
        return (eventDate >= now || event.status === "upcoming");
      } else if (filter === "past") {
        return (eventDate < now || event.status === "past");
      }
      
      return true; // Show all events if no filter is applied
    });
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D9CE9A] to-[#8177A6]">
        <div className="text-lg text-[#2B1E59] font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D9CE9A] to-[#8177A6]">
      <div className="max-w-4xl mx-auto">
        {selectedEvent ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#2B1E59] mb-6">
              {selectedEvent.title}
            </h2>
            <p className="text-[#5C4F8C] leading-relaxed mb-6">
              {selectedEvent.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-[#372773]">
                <p className="mb-2">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {selectedEvent.startDate}
                </p>
                <p>
                  <span className="font-semibold">End Time:</span>{" "}
                  {selectedEvent.end}
                </p>
              </div>
              <div className="text-[#372773]">
                <p className="mb-2">
                  <span className="font-semibold">Venue:</span>{" "}
                  {selectedEvent.venue}
                </p>
                <p>
                  <span className="font-semibold">Organizer:</span>{" "}
                  {selectedEvent.organizerDetails}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#2B1E59] mb-6">
                Registrations
              </h3>
              {registrations.length > 0 ? (
                <ul className="space-y-4">
                  {registrations.map((registration) => (
                    <li
                      key={registration.id}
                      className="flex justify-between items-center bg-[#F5F3FF] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <span className="text-[#372773] font-medium">
                        {registration.name} - {registration.email} -{" "}
                        {registration.phone}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#5C4F8C]">
                  No registrations for this event.
                </p>
              )}
            </div>             

            <div className="mt-8 text-right">
              <button
                onClick={handleBack}
                className="px-6 py-2 text-white bg-[#5C4F8C] rounded-lg hover:bg-[#372773] transition-colors duration-200"
              >
                Back to Events
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold text-[#2B1E59] mb-12 text-center">
              Events
            </h2>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 text-white rounded-lg mx-2 ${
                  filter === "all" ? "bg-[#372773]" : "bg-[#5C4F8C]"
                } hover:bg-[#372773] transition-colors duration-200`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter("coming")}
                className={`px-6 py-2 text-white rounded-lg mx-2 ${
                  filter === "coming" ? "bg-[#372773]" : "bg-[#5C4F8C]"
                } hover:bg-[#372773] transition-colors duration-200`}
              >
                Coming Events
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-6 py-2 text-white rounded-lg mx-2 ${
                  filter === "past" ? "bg-[#372773]" : "bg-[#5C4F8C]"
                } hover:bg-[#372773] transition-colors duration-200`}
              >
                Past Events
              </button>
            </div>

            {filterEvents([...events, ...adminEvents]).length > 0 ? (
              <div className="space-y-6">
                {filterEvents([...events, ...adminEvents]).map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      <div className="border-l-4 border-[#5C4F8C] pl-4">
                        <h3 className="text-2xl font-semibold text-[#2B1E59]">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-[#5C4F8C] leading-relaxed">
                        {event.description}
                      </p>
                      <div className="text-right">
                        <button
                          onClick={() => fetchEventDetails(event.id)}
                          className="px-6 py-2 text-white bg-[#5C4F8C] rounded-lg hover:bg-[#372773] transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                <p className="text-[#5C4F8C] text-lg">
                  No events available at the moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsDashboardAdmin;
