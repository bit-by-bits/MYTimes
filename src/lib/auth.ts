import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

// Mock Google OAuth implementation
// This can be easily replaced with actual OAuth later

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export const signInWithGoogle = async (): Promise<GoogleUser> => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      picture: user.photoURL || undefined,
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signInWithGitHub = async (): Promise<GoogleUser> => {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      picture: user.photoURL || undefined,
    };
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    throw error;
  }
};

export const signUpWithGoogle = async (): Promise<GoogleUser> => {
  // For Google auth, sign up and sign in are the same process
  return signInWithGoogle();
};

export const signUpWithGitHub = async (): Promise<GoogleUser> => {
  // For GitHub auth, sign up and sign in are the same process
  return signInWithGitHub();
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
};
