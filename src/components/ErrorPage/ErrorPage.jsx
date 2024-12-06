import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');  
  };

  return (
    <div className="bodyerror">
    <div className="error-container">
      <div className="error-content">
        <div className="error-title">
          <h1>404</h1>
          <h2>Oops! Page Not Found.</h2>
        </div>
        <p className="error-description">
          The page you are looking for does not exist. Please check the URL or go back to the homepage by clicking the button below.
        </p>
        <button className="btn-go-home" onClick={goHome}>Go to Home</button>
      </div>
    </div>
    </div>
  );
};

export default ErrorPage;
