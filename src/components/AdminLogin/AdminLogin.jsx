import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  // State variables for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For navigation to admin panel after successful login

  // Login handler function
  const handleLogin = (e) => {
    e.preventDefault();  // Prevent default form submission

    // Simple validation: Check if the username and password are correct
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin-panel');  // Redirect to the admin panel if login is successful
    } else {
      alert('Invalid username or password');  // Show alert for invalid login
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="login-key">
          <i className="fa fa-key" aria-hidden="true"></i>  {/* Icon for the key */}
        </div>
        <div className="login-title">ADMIN PANEL</div>  {/* Title of the login form */}
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-control-label">USERNAME</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Update username state on change
                required
              />
            </div>
            <div className="form-group">
              <label className="form-control-label">PASSWORD</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update password state on change
                required
              />
            </div>
            <div className="loginbttm">
              <div className="login-button">
                <button type="submit" className="btn btn-outline-primary">
                  LOGIN  {/* Submit button */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
