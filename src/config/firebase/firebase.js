// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFX-z4GfsJzK4Ep_KJd3icXmV7kBka9EM',
  authDomain: 'requisition-system.firebaseapp.com',
  projectId: 'requisition-system',
  storageBucket: 'requisition-system.appspot.com',
  messagingSenderId: '409911220321',
  appId: '1:409911220321:web:9560326b5f9d44e8b17220',
  vapidKey: "BPXbpkufprC3AFZQbeoZyETcwXdUex2SPwkJ0wlb37NfDRP43tHb55k9gybAJRqmePfJjtpq8azkZV2pIE_XgBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;