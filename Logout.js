import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('Email');

    // Redirect to login page
    navigate('/UserLogin');
  }, [navigate]);

  return (
    <div>
      <h2>Logging Out...</h2>
      <p>You are being redirected to the login page.</p>
    </div>
  );
};

export default Logout;