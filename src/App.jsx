import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    // AuthProvider wraps all routes to provide context
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;