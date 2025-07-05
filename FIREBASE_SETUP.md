# Firebase Setup Guide for Semantic Highlighter

## 🚀 Quick Start

This guide will help you set up Firebase Authentication for the Semantic Highlighter application with Email/Password, Google, and GitHub sign-in.

## 📋 Prerequisites

- A Google/Firebase account
- A GitHub account (for GitHub OAuth)
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
   - **GitHub**: Click and enable (requires GitHub OAuth app)

### 3. Set up GitHub OAuth App

1. Go to your [GitHub Settings](https://github.com/settings/developers)
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in the details:
   - **Application name**: Semantic Highlighter
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: Get this from Firebase Console → Authentication → Sign-in method → GitHub → Configuration
4. Copy the **Client ID** and **Client Secret**
5. Go back to Firebase Console → Authentication → GitHub
6. Paste the Client ID and Client Secret
7. Copy the **Authorization callback URL** from Firebase
8. Go back to GitHub OAuth App settings and update the callback URL

### 4. Create a Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "semantic-highlighter-web")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

### 5. Configure the Application

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

### 6. Add Authorized Domains

1. In Firebase Console, go to Authentication > Settings
2. In the "Authorized domains" section, add your domains:
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
2. Enter email, name, and password
3. The app should redirect to the main interface

### Google Authentication
1. Click "Sign in with Google"
2. Choose your Google account
3. The app should redirect to the main interface

### GitHub Authentication
1. Click "Sign in with GitHub"
2. Authorize the application
3. The app should redirect to the main interface

## 🔒 Security Rules

For production, consider setting up Firebase Security Rules:

1. Go to Firestore Database > Rules (if using Firestore)
2. Set appropriate read/write rules for your use case

## 🛠️ Features Implemented

### ✅ Authentication
- Firebase Email/Password Authentication
- Google Sign-in with popup
- GitHub Sign-in with popup
- Proper error handling for all auth methods
- Persistent authentication state

### ✅ Editor Improvements
- WYSIWYG rich text editor with TipTap
- Fixed underline formatting (now works properly)
- Enhanced formatting toolbar with hover states
- Keyboard shortcuts support (Ctrl+B, Ctrl+I, Ctrl+U)

### ✅ UI/UX Polish
- Pill-style toggles with tooltips
- Loading spinner for analyze button
- Copy to clipboard functionality
- "Try Sample Text" feature
- Animated highlights with fade-in effects
- Improved responsive design

### ✅ API Integration
- Enhanced dummy API with realistic latency
- New scalable input/output format
- Intelligent pattern matching
- Support for multiple languages (prepared)

### ✅ Navigation & About Page
- Updated navigation (Home, About, GitHub, Feedback)
- Comprehensive About page with numbered steps
- Feature cards with hover effects
- Footer with version and contact info

## 📝 API Structure

The application now uses an improved API structure:

**Request:**
```typescript
POST /api/highlight
Content-Type: application/json

{
  "text": "Your text content here...",
  "language": "en",
  "enabledTags": ["definition", "example", "todo", "quote"]
}
```

**Response:**
```json
{
  "highlights": [
    {
      "type": "definition",
      "start": 21,
      "end": 70,
      "text": "a web of linked data that enables machines to understand"
    },
    {
      "type": "example",
      "start": 132,
      "end": 160,
      "text": "For example, Netflix recommendations"
    }
  ]
}
```

## 🎨 Highlight Types & Colors

- **Definition** → Light blue background with border
- **Example** → Light green background with border
- **TODO** → Light yellow background with border
- **Quote** → Light purple background with border

## � Mobile Support

The application is fully responsive and includes:
- Mobile-friendly navigation in dropdown menu
- Touch-optimized pill toggles
- Responsive grid layouts
- Optimized text editor for mobile

## 🚨 Troubleshooting

### GitHub OAuth Issues
- Make sure the Authorization callback URL matches exactly
- Check that the OAuth app is not suspended
- Verify Client ID and Client Secret are correct

### Firebase Issues
- Ensure all required auth providers are enabled
- Check that authorized domains include your development domain
- Verify Firebase configuration is correct

## �📚 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [GitHub OAuth Apps Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [TipTap Editor Documentation](https://tiptap.dev/)
- [React + TypeScript + Vite Template](https://vitejs.dev/guide/)

## 🎯 Next Steps

The application is now production-ready with:
- Multiple authentication providers
- Polished UI/UX
- Enhanced text editor
- Comprehensive documentation

Consider adding:
- Real backend API integration
- User preferences storage
- Text export functionality
- Advanced highlight customization