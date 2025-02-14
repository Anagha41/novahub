import React, { useState } from "react";
import axios from "axios";

function ForgottPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/forgot-password",
        { email }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage(
        error.response?.data || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#D9CE9A] to-[#8177A6] bg-cover bg-center"
      style={{ backgroundImage: "url('/event1.png')" }}
    >
      {" "}
      {/* Organic blob shapes */}
      <div className="absolute top-16 left-8 w-96 h-96 bg-[#D1D6A8] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />
      <div className="absolute top-24 right-16 w-80 h-80 bg-[#F4D8B2] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-16 left-20 w-96 h-96 bg-[#C2CDAA] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-4000" />
      <div className="absolute -bottom-12 right-24 w-80 h-80 bg-[#F8E3C9] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-lg py-8 px-6 shadow-lg shadow-[#D1D6A8] sm:rounded-2xl sm:px-10 border border-[#B0B57E]">
            {message && (
              <div
                className={`mb-4 p-3 text-sm rounded-lg ${
                  message.includes("error")
                    ? "text-red-700 bg-red-100"
                    : "text-green-700 bg-green-100"
                }`}
              >
                {message}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-[#6B705C]">
                  Forgot Password?
                </h2>
                <p className="mt-2 text-center text-md text-[#6B705C]">
                  Enter your email address and we'll send you a reset link.
                </p>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#6B705C]"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-[#B0B57E] px-4 py-2 placeholder-[#9AA899] shadow-md focus:border-[#B0B57E] focus:outline-none focus:ring-2 focus:ring-[#B0B57E] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full justify-center rounded-lg bg-[#6B705C] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#55664A] focus:outline-none focus:ring-2 focus:ring-[#B0B57E] focus:ring-offset-2 transition-transform transform ${
                    isLoading
                      ? "opacity-75 cursor-not-allowed scale-95"
                      : "hover:scale-105"
                  }`}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#B0B57E]"></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-[#6B705C]">
                  Remember your password?{" "}
                  <a
                    href="/UserLogin"
                    className="font-medium text-[#6B705C] hover:text-[#55664A]"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgottPassword;
