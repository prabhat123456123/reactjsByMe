// components/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  console.log("user",user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        {user && (
          <div className="user-info">
            <h2>Hello, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Welcome to your personalized dashboard.</p>
          </div>
        )}
        
        <div className="dashboard-widgets">
          <div className="widget">Widget 1</div>
          <div className="widget">Widget 2</div>
          <div className="widget">Widget 3</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;