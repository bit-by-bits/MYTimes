import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { MainApp } from './components/main/MainApp';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return <div className="App">{user ? <MainApp /> : <AuthPage />}</div>;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
