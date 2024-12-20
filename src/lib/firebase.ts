import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

const authProviders = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider()
};

const handleAuth = async (providerKey: keyof typeof authProviders) => {
  const provider = authProviders[providerKey];

  if (!provider) {
    console.error(`Invalid provider key: ${providerKey}`);
    return;
  }

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    console.log(`${providerKey} login successful:`, result.user);
  } catch (error) {
    console.error(`${providerKey} login error:`, error);
  }
};

export {
  firebaseApp,
  firebaseAnalytics,
  firebaseAuth,
  handleAuth,
  authProviders
};
