import React, { useState } from 'react';
import AboutPage from '../../pages/AboutPage';
import SettingsPage from '../../pages/SettingsPage';
import FeedbackPage from '../../pages/FeedbackPage';

type CurrentPage = 'home' | 'about' | 'settings' | 'feedback';

export const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'settings':
        return <SettingsPage />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return (
          <div className="text-center py-8">
            Welcome to Semantic Highlighter!
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-4 sm:py-6 lg:py-8">{renderCurrentPage()}</main>
    </div>
  );
};
