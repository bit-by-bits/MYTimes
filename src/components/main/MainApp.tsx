import React, { useState } from 'react';
import { Header } from './Header';
import { SemanticHighlighter } from './SemanticHighlighter';
import { About } from './About';

type CurrentPage = 'home' | 'about';

export const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onBack={() => handleNavigate('home')} />;
      default:
        return <SemanticHighlighter />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="py-8">{renderCurrentPage()}</main>
    </div>
  );
};
