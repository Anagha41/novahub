import React, { useEffect, useState } from "react";
import EventRegistrationForm from "./EventRegistrationForm";
import axios from "axios";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";


const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [UserId] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [viewMode, setViewMode] = useState("coming");
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const navigate = useNavigate();

  //for fetching events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (response.ok) {
          const eventsData = await response.json();
          setEvents(eventsData);
        } else {
          setError("Failed to fetch events");
        }
      } catch (error) {
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setShowRegistrationForm(false);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };
  // for registering events

  const checkUserRegistration = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/registrations/event/${eventId}`
      );
      if (response.ok) {
        const registrations = await response.json();
        const userAlreadyRegistered = registrations.some(
          (registration) => registration.userId === UserId
        );
        setIsRegistered(userAlreadyRegistered);
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    checkUserRegistration(event.id);
  };

  //filtering events

  const filterEvents = (eventsData) => {
    const now = new Date();
    return eventsData.filter((event) => {
      const eventDate = new Date(event.startDate);
      if (viewMode === "coming")
        return eventDate >= now || event.status === "upcoming";
      if (viewMode === "past")
        return eventDate < now || event.status === "past";
      return true;
    });
  };

  const fetchFeedback = async (eventId) => {
    setLoadingFeedback(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/event/${eventId}`
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
    setLoadingFeedback(false);
  };
  const handleSendFeedback = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post("http://localhost:8080/api/feedback/add", {
        eventId: selectedEvent.id,
        UserId,
        comment,
      });
      setComment("");
      fetchFeedback(selectedEvent.id);
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300">
        <div className="flex items-center justify-center h-screen space-x-4">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-100" />
          <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-200" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border-l-4 border-red-500">
          <p className="text-slate-800 text-lg font-medium text-center">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <nav className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            "AdminEvents",
            "All Events",
            "Upcoming Events",
            "Past Events",
            "Dashboard",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "All Events") setViewMode("all");
                else if (item === "Upcoming Events") setViewMode("coming");
                else if (item === "Past Events") setViewMode("past");
                else if(item === "AdminEvents") navigate("/AdminEvents");  // Navigate to AdminEvents page
                else if(item === "Dashboard") navigate("/UserDashboard");  // Navigate to dashboard page

              }}
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                item === "AdminEvents" || item === "Dashboard"
                  ? "bg-white text-purple-600 hover:bg-purple-50"
                  : viewMode === item.toLowerCase().split(" ")[0]
                  ? "bg-white text-purple-600 shadow-lg"
                  : "bg-purple-400/30 text-white hover:bg-purple-400/50"
              } backdrop-blur-sm`}
            >
              {item}
            </button>
            
          ))}
        </nav>

        {selectedEvent && !showRegistrationForm ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 via-pink-300 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <button
                  onClick={handleBackToEvents}
                  className="text-blue-500 hover:text-blue-300 transition-colors"
                >
                  ← Back to Events
                </button>
              </div>
            </div>

            {/*feedback */}
            <div className="w-full max-w-4xl mx-auto">
            {viewMode === "past" && selectedEvent && (

              <div className="rounded-xl bg-white shadow-lg border border-gray-100">
                
                {/* Header Section */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Event Feedback
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Share your insights and experiences to help us improve
                    future events
                  </p>
                </div>

                {/* Feedback List */}
                <div className="px-8 py-6">
                  
                  <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                    {loadingFeedback ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin h-5 w-5 border-3 border-gray-600 border-t-transparent rounded-full" />
                        <span className="ml-3 text-gray-600">
                          Loading feedback...
                        </span>
                      </div>
                    ) : feedbacks.length > 0 ? (
                      feedbacks.map((fb, index) => (
                        <div
                          key={index}
                          className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-all duration-200"
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {fb.comment}
                          </p>
                          {fb.timestamp && (
                            <p className="text-xs text-gray-500 mt-3 opacity-80 group-hover:opacity-100">
                              {new Date(fb.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 font-medium">
                          No feedback yet
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Be the first to share your valuable insights
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Section */}
                <div className="px-8 py-6 bg-gray-50 rounded-b-xl border-t border-gray-100">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          placeholder:text-gray-400 resize-none h-[72px]"
                        placeholder="What are your thoughts about the event?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={500}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {comment.length}/500
                      </div>
                    </div>
                    <button
                      onClick={handleSendFeedback}
                      disabled={!comment.trim()}
                      className="px-6 py-3 bg-purple-500 text-white hover:bg-purple-400 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2 h-[52px]"
                    >
                      <Send className="h-5 w-5" />
                      <span className="font-medium">Submit</span>
                    </button>
                  </div>
                </div>
              </div>
              )}
              {/*feedback */}
            
              <div className="grid md:grid-cols-2 gap-6 mb-8"></div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span className="text-blue-500 mr-3">📅</span>
                    <div>
                      <p className="text-sm text-slate-500">Start Date</p>
                      <p className="font-medium">{selectedEvent.startdate}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span className="text-blue-500 mr-3">📅</span>
                    <div>
                      <p className="text-sm text-slate-500">End Date</p>
                      <p className="font-medium">{selectedEvent.enddate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span className="text-blue-500 mr-3">📍</span>
                    <div>
                      <p className="text-sm text-slate-500">Venue</p>
                      <p className="font-medium">{selectedEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span className="text-blue-500 mr-3">👤</span>
                    <div>
                      <p className="text-sm text-slate-500">Organizer</p>
                      <p className="font-medium">
                        {selectedEvent.organizerDetails}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  {isRegistered ? (
                    <button
                      className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium cursor-not-allowed opacity-75"
                      disabled
                    >
                      ✓ Already Registered
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(selectedEvent)}
                      className="px-6 py-3 bg-pink-300 text-white rounded-lg font-medium hover:bg-purple-400 transition-colors shadow-lg shadow-blue-500/30"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              {viewMode === "coming"
                ? "Upcoming Events"
                : viewMode === "past"
                ? "Past Events"
                : "All Events"}
            </h1>

            {filterEvents(events).length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filterEvents(events).map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-500 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">
                          📅 {event.startdate}
                        </span>
                        <button
                          onClick={() => handleViewEventDetails(event)}
                          className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-slate-600">
                  No events available at the moment.
                </p>
              </div>
            )}
          </div>
        )}

        {showRegistrationForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative">
              <div className="p-6">
                <button
                  onClick={handleCloseRegistrationForm}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Register for {selectedEvent?.title}
                </h3>
                <EventRegistrationForm
                  event={selectedEvent}
                  UserId={UserId}
                  onClose={handleCloseRegistrationForm}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
