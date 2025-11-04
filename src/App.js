import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from './components/UserForm';
import UserFormMandatory from './components/UserFormMandatory';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { clearError } from './store/slices/authSlice';
import Dashboard from './components/Dashboard';

function App() {
   const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear error when component unmounts or when error exists
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [error, dispatch]);
  return (
    <div className="App">
       {/* Global Error Alert */}
      {error && (
        <div className="alert alert-error">
          {typeof error === 'string' ? error : error.message || 'An error occurred'}
          <button onClick={() => dispatch(clearError())}>×</button>
        </div>
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace />: 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login />
          } 
        />
          <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Register />
          } 
        />
        {/* Define your routes here */}
       <Route 
          path="/UserForm" 
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
       
      </Routes>
    </div>
  );
}

export default App;