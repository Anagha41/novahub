import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");

      localStorage.setItem("email", formData.email);
      localStorage.setItem("id", response.data.userId);

      if (response.data.role === "admin") {
        window.location.href = "/AdminDashboard";
      } else if (response.data.role === "user") {
        window.location.href = "/Userdashboard";
      } else if (response.data.role === "coordinator") {
        window.location.href = "/CoordinatorDashboard";
      } else if (response.data.role === "hod") {
        window.location.href = "/HodDashboard";
      }
    } catch (error) {
      setErrorMessage(error.response?.data || "Invalid email or password");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-50 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-full mt-4 shadow-lg mx-auto max-w-[1200px]">
          <div className="w-full px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center">
              <img src="/nova.png" alt="NOVA HUB Logo" className="h-10 mr-2" />
            </h1>
            <nav className="flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </a>
              <a
                href="/UserLogin"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Login
              </a>
             
            </nav>
          </div>
        </div>
      </header>

      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#D9CE9A] to-[#8177A6] bg-cover bg-center"
        style={{ backgroundImage: "url('/event1.png')" }}
      >
        {" "}
        <div className="absolute inset-0 bg-cover bg-center blur-sm pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40 pointer-events-none" />
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-center text-[#372773] mb-8">
            Login
          </h1>
          <p className="text-center text-[#5C4F8C] text-sm mb-6">
            Welcome back! Please log in to continue.{" "}
            <a
              href="/ForgottPassword"
              className="font-medium text-[#2B1E59] hover:text-[#5C4F8C]"
            >
              Forgot your password?
            </a>
          </p>

          {errorMessage && (
            <p className="text-sm text-red-600 mb-4 text-center font-semibold">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600 mb-4 text-center font-semibold">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5C4F8C]" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-12 py-3 border border-[#8177A6] rounded-full focus:outline-none focus:ring-4 focus:ring-[#D9CE9A] transition-all"
              />
            </div>
            <div className="mb-6 relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5C4F8C]" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-12 py-3 border border-[#8177A6] rounded-full focus:outline-none focus:ring-4 focus:ring-[#D9CE9A] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#372773] to-[#5C4F8C] text-white py-3 rounded-full font-semibold hover:from-[#5C4F8C] hover:to-[#372773] shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      {/* Footer remains the same */}
      <footer className="bg-black/90 backdrop-blur-md text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">NOVA HUB</h3>
              <p className="text-gray-400">
                Your gateway to campus life and community engagement.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Events
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@novahub.com"
                  className="flex items-center hover:text-white transition-colors duration-200"
                >
                  <Mail className="mr-3 w-5 h-5" />
                  novahubevents@gmail.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center hover:text-white transition-colors duration-200"
                >
                  <Phone className="mr-3 w-5 h-5" />
                  +98 766 55432
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} NOVA HUB. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserLogin;
