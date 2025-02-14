import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FeedbackSection = ({ eventId, userId, username }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [feedbacks]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedbacks/event/${eventId}`
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newFeedback = {
      id: Date.now(), // Temporary ID for instant display
      user: { id: userId, username },
      comment: message,
      timestamp: new Date().toISOString(),
    };

    setFeedbacks([...feedbacks, newFeedback]); // Instant update
    setMessage(""); // Clear input field

    try {
      await axios.post("http://localhost:8080/api/feedbacks/add", {
        eventId,
        userId,
        comment: message,
      });
      fetchFeedbacks(); // Sync with server
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Feedback</h2>

      {/* Chat Box */}
      <div className="h-80 overflow-y-auto border p-3 rounded-lg mb-3 bg-gray-100">
        {feedbacks.length === 0 ? (
          <p className="text-gray-500 text-center">No feedback yet. Start the conversation!</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb.id} className="mb-3">
              <p className="font-bold text-blue-600">{fb.user.username}</p>
              <p className="bg-white p-2 rounded-lg shadow-md">{fb.comment}</p>
              <p className="text-gray-500 text-sm">{new Date(fb.timestamp).toLocaleTimeString()}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field & Send Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackSection;
