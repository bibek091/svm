// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDymbKVAeevT5hqFJc8JvDPYgqCNSKou5U",
  authDomain: "schooldb-c9cd1.firebaseapp.com",
  projectId: "schooldb-c9cd1",
  storageBucket: "schooldb-c9cd1.firebasestorage.app",
  messagingSenderId: "645507156099",
  appId: "1:645507156099:web:278b79daac68121ed633b6",
  measurementId: "G-EFXLTE0V8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
