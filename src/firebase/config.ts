// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIe9e0AKlA37Pdg0EWPam_BTZ8YCzlEMs',
  authDomain: 'simple-blog-app-storage.firebaseapp.com',
  projectId: 'simple-blog-app-storage',
  storageBucket: 'simple-blog-app-storage.appspot.com',
  messagingSenderId: '1051513319120',
  appId: '1:1051513319120:web:4d7cdaca2e1051d34738d5',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)