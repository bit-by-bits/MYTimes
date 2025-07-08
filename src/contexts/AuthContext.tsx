import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  signInWithGoogle,
  signUpWithGoogle,
  signInWithGitHub,
  signUpWithGitHub,
  signInWithEmail,
  signUpWithEmail,
} from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
  loginWithGitHub: () => Promise<void>;
  signupWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isInitializing: boolean;
  isGuest: boolean;
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

const GUEST_USER = {
  id: 'guest',
  name: 'Guest',
  email: '',
  picture: '',
  isGuest: true,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('guest') === 'true') {
      setUser(GUEST_USER);
      setIsGuest(true);
      setIsInitializing(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name:
            firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          picture: firebaseUser.photoURL || undefined,
        });
      } else {
        setUser(null);
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signUpWithEmail(email, password);
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('Signup failed:', error);
      let errorMessage = 'Signup failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('Google login failed:', error);
      let errorMessage = 'Google login failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signUpWithGoogle();
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('Google signup failed:', error);
      let errorMessage = 'Google signup failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Signup cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setIsLoading(true);
    try {
      await signInWithGitHub();
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('GitHub login failed:', error);
      let errorMessage = 'GitHub login failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      } else if (
        error.code === 'auth/account-exists-with-different-credential'
      ) {
        errorMessage =
          'An account already exists with this email using a different sign-in method.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGitHub = async () => {
    setIsLoading(true);
    try {
      await signUpWithGitHub();
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      console.error('GitHub signup failed:', error);
      let errorMessage = 'GitHub signup failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Signup cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      } else if (
        error.code === 'auth/account-exists-with-different-credential'
      ) {
        errorMessage =
          'An account already exists with this email using a different sign-in method.';
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('guest');
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged
      localStorage.clear();
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    signupWithGoogle,
    loginWithGitHub,
    signupWithGitHub,
    logout,
    isLoading,
    isInitializing,
    isGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
