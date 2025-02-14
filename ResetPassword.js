import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        
        setIsLoading(true);
        const token = searchParams.get("token");
        try {
            const response = await axios.post(
                "http://localhost:8080/reset-password",
                { token, newPassword: password }
            );
            setMessage(response.data);
            setTimeout(() => navigate('/UserLogin'), 3000);
        } catch (error) {
            setMessage(error.response?.data || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative h-screen bg-gradient-to-br from-[#E8EAC8] via-[#F5F6E1] to-[#F9F9F2] overflow-hidden">
            {/* Organic blob shapes */}
            <div className="absolute top-16 left-8 w-96 h-96 bg-[#D1D6A8] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />
            <div className="absolute top-24 right-16 w-80 h-80 bg-[#F4D8B2] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-16 left-20 w-96 h-96 bg-[#C2CDAA] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-4000" />
            <div className="absolute -bottom-12 right-24 w-80 h-80 bg-[#F8E3C9] rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />

            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-[#6B705C]">
                        Reset Your Password
                    </h2>
                    <p className="mt-2 text-center text-md text-[#6B705C]">
                        Please enter your new password
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white/90 backdrop-blur-lg py-8 px-6 shadow-lg shadow-[#D1D6A8] sm:rounded-2xl sm:px-10 border border-[#B0B57E]">
                        {message && (
                            <div className={`mb-4 p-3 text-sm rounded-lg ${
                                message.includes("error") || message.includes("not match") ? 
                                "text-red-700 bg-red-100" : 
                                "text-green-700 bg-green-100"
                            }`}>
                                {message}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#6B705C]">
                                    New Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-lg border border-[#B0B57E] px-4 py-2 placeholder-[#9AA899] shadow-md focus:border-[#B0B57E] focus:outline-none focus:ring-2 focus:ring-[#B0B57E] sm:text-sm"
                                        placeholder="Enter your new password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B705C]">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-lg border border-[#B0B57E] px-4 py-2 placeholder-[#9AA899] shadow-md focus:border-[#B0B57E] focus:outline-none focus:ring-2 focus:ring-[#B0B57E] sm:text-sm"
                                        placeholder="Confirm your new password"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex w-full justify-center rounded-lg bg-[#6B705C] py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-[#55664A] focus:outline-none focus:ring-2 focus:ring-[#B0B57E] focus:ring-offset-2 transition-transform transform ${
                                        isLoading ? 'opacity-75 cursor-not-allowed scale-95' : 'hover:scale-105'
                                    }`}
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
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
                                    Back to{" "}
                                    <a href="/login" className="font-medium text-[#6B705C] hover:text-[#55664A]">
                                        Sign In
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

export default ResetPassword;
