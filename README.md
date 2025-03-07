# Chat App

## Overview
This is a React Native chat application with Firebase authentication and Firestore database integration. It allows users to sign up, sign in, and chat in real time with other users. The app features user authentication, a chat interface powered by `react-native-gifted-chat`, and Firestore for storing messages.

## Features
- **User Authentication**: Firebase Authentication (Email/Password Sign-in)
- **Real-time Chat**: Messages are stored in Firestore and displayed in real-time
- **User Profiles**: Each user has a unique ID and display name
- **Logout Functionality**: Users can securely sign out of the app
- **Custom User Avatars**: Users are assigned avatars using `Pravatar`

## Project Structure
```
📦 Chat App
├── .expo-shared/       # Expo configurations
├── android/            # Android-specific configurations
├── assets/             # Static assets like images and icons
├── config/             # Firebase configuration and other settings
├── screens/            # App screens (Chat, Login, SignUp, Home, etc.)
├── .gitignore          # Files ignored by Git
├── App.js              # Main application entry point
├── app.config.js       # Expo app configuration
├── babel.config.js     # Babel configuration
├── colors.js           # Color theme configurations
├── eas.json            # Expo Application Services (EAS) configuration
├── index.js            # Entry point for React Native
├── metro.config.js     # Metro bundler configuration
├── package-lock.json   # Lock file for dependencies
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
```

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/)
- Firebase Project set up

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add a Firestore database
   - Set up Firebase Authentication (Email/Password)
   - Configure `config/firebase.js` with your Firebase credentials
4. Start the app:
   ```sh
   npm start
   ```

## Usage
- **Sign Up**: New users can create an account.
- **Login**: Existing users can log in using their email and password.
- **Chat**: Users can send and receive messages in real time.
- **Logout**: Users can sign out securely.

## Dependencies
- `react-native-gifted-chat`: For the chat UI
- `firebase`: For authentication and Firestore
- `react-navigation`: For navigation between screens
- `react-native-vector-icons`: For icons in the UI

## Contributing
Feel free to contribute! Fork the repository and submit a pull request.

## License
MIT License

