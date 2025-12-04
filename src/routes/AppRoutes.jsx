// src/routes/AppRoutes.jsx (or wherever you keep it)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';

// Import your Dashboard Layout
import DashboardLayout from '../components/layout/DashBoardLayout';

import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Root Redirect Logic
const HomeRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-3 text-lg text-indigo-600">Checking Session...</span>
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
    <a href="/" className="mt-8 text-indigo-600 hover:underline text-lg">
      ← Go Home
    </a>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Protected Dashboard Routes – Layout applied to all children */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Default dashboard page */}
        <Route path="/dashboard" element={<DashboardPage />} />

       
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;