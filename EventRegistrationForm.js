import React, { useState, useEffect } from "react";

const EventRegistrationForm = ({ event, userId, onClose }) => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false); // Track registration status based on backend

  useEffect(() => {
    if (event) {
      const eventEndDate = new Date(event.enddate);
      const currentDate = new Date();

      // Registration is open if the current date is before both event end date and registration deadline (if any)
      setIsRegistrationOpen(currentDate < eventEndDate); // Close registration if current date is past the event end date
    }
  }, [event]);

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegistrationData({ ...registrationData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload with necessary IDs and data
    const payload = {
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      event: { id: event.id }, // Send event ID
      user: { id: userId }, // Send user ID
    };

    try {
      console.log("Payload being sent: ", payload); // Log payload for debugging

      const response = await fetch(
        "http://localhost:8080/api/registrations/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Registration successful!");
        setIsRegistered(true); // Update registration status
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        alert(`Failed to register: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={registrationData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={registrationData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={registrationData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                !isRegistrationOpen || isRegistered
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white"
              }`}
              disabled={!isRegistrationOpen || isRegistered}
            >
              {isRegistered
                ? "Registered"
                : isRegistrationOpen
                ? "Submit"
                : "Registration Closed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
