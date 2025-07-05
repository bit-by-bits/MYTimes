import React from 'react';
import { Header } from './Header';
import { SemanticHighlighter } from './SemanticHighlighter';

export const MainApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <SemanticHighlighter />
      </main>
    </div>
  );
};
