import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import type { ReactNode } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import HighlighterPage from './pages/HighlighterPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';
import { Header } from './components/main/Header';
import { AuthPage } from './components/auth/AuthPage';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isInitializing } = useAuth();
  if (isInitializing) return null;
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="py-4 sm:py-6 lg:py-8">{children}</main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <HighlighterPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/highlighter"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <HighlighterPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AboutPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <FeedbackPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SettingsPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
