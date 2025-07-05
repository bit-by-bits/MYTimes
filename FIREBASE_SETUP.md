# Firebase Setup Guide for Semantic Highlighter

## 🚀 Quick Start

This guide will help you set up Firebase Authentication for the Semantic Highlighter application.

## 📋 Prerequisites

- A Google/Firebase account
- Node.js and npm installed

## 🔧 Firebase Configuration

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "semantic-highlighter")
4. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click and enable
   - **Google**: Click, enable, and set a project support email

### 3. Create a Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "semantic-highlighter-web")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

### 4. Configure the Application

1. Open `src/lib/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 5. Add Authorized Domains (for Google Sign-in)

1. In Firebase Console, go to Authentication > Settings
2. In the "Authorized domains" section, add your domain:
   - For local development: `localhost`
   - For production: your actual domain

## 🏃‍♂️ Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing Authentication

### Email/Password Authentication
1. Click "Sign up" to create a new account
2. Enter email and password
3. The app should redirect to the main interface

### Google Authentication
1. Click "Sign in with Google"
2. Choose your Google account
3. The app should redirect to the main interface

## 🔒 Security Rules

For production, consider setting up Firebase Security Rules:

1. Go to Firestore Database > Rules (if using Firestore)
2. Set appropriate read/write rules for your use case

## 🛠️ Features Implemented

- ✅ Firebase Email/Password Authentication
- ✅ Google Sign-in with popup
- ✅ Proper error handling for auth errors
- ✅ Persistent authentication state
- ✅ WYSIWYG rich text editor with TipTap
- ✅ Dummy highlight API integration
- ✅ Color-coded semantic highlighting
- ✅ Updated navigation (Home, About, GitHub)

## 📝 API Integration

The application includes a dummy API that simulates the requested endpoint:

```typescript
POST /api/highlight
Content-Type: application/json

{
  "text": "<user-input-text>"
}
```

Response:
```json
{
  "highlights": [
    {
      "type": "definition",
      "text": "A binary tree is a data structure...",
      "start": 12,
      "end": 48
    }
  ]
}
```

## 🎨 Highlight Types

- **Definition** → Light blue background
- **Example** → Light green background  
- **TODO** → Light yellow background
- **Quote** → Light purple background

## 📚 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [TipTap Editor Documentation](https://tiptap.dev/)
- [React + TypeScript + Vite Template](https://vitejs.dev/guide/)