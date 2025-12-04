// src/routes/AppRoutes.jsx (with lazy loading)
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

// 1. Convert static imports to React.lazy for route components
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));

// Import your Dashboard Layout (You might lazy-load this too, but we'll keep it static for simplicity/initial load)
import DashboardLayout from '../components/layout/DashBoardLayout';

// Fallback component for Suspense
const RouteFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-3 text-lg text-indigo-600">Loading Page...</span>
    </div>
);

// Root Redirect Logic (No change needed here, as it doesn't render a route component directly)
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

// 404 Page (Can also be lazy-loaded)
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
        // 2. Wrap the Routes with Suspense and provide a fallback
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                {/* Root Redirect */}
                <Route path="/" element={<HomeRedirect />} />

                {/* Public Auth Routes (Now lazy-loaded) */}
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
                    {/* Default dashboard page (Now lazy-loaded) */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    
                    {/* Add other protected routes here... */}
                </Route>

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;