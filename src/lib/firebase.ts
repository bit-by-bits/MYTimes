import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZCOulJmg0VgiwBQN5si1s0WMTUsEeTW0',
  authDomain: 'semantic-highlighter-3c23a.firebaseapp.com',
  projectId: 'semantic-highlighter-3c23a',
  storageBucket: 'semantic-highlighter-3c23a.firebasestorage.app',
  messagingSenderId: '200162999191',
  appId: '1:200162999191:web:171c4ae31f0f0b62ed62d2',
  measurementId: 'G-BT14T1L3TB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
