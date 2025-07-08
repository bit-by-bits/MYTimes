import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleGuest = () => {
    localStorage.setItem('guest', 'true');
    window.location.reload(); // reload to trigger guest mode
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Semantic Highlighter
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Highlight specific semantic structures in your text
          </p>
        </div>
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
        <div className="flex flex-col items-center gap-2 pt-2">
          <button
            className="text-xs text-primary underline hover:text-primary/80"
            onClick={handleGuest}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
