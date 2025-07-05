import React, { createContext, useContext, useState, ReactNode } from 'react';
import { signInWithGoogle, signUpWithGoogle } from '../lib/auth';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock user data
      const userData: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };

      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock signup - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock user data
      const userData: User = {
        id: '1',
        email: email,
        name: name,
      };

      setUser(userData);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const googleUser = await signInWithGoogle();
      const userData: User = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      };
      setUser(userData);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    setIsLoading(true);
    try {
      const googleUser = await signUpWithGoogle();
      const userData: User = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      };
      setUser(userData);
    } catch (error) {
      console.error('Google signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    signupWithGoogle,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
