// firebase-config.js - Firebase Konfiguration für Zahngut App
// Projekt: zahngut-app-v2
// Erstellt am: 28.09.2025

const firebaseConfig = {
    apiKey: "AIzaSyA0LQpDc2EGE8Xr7gGaC7vnUHmkXT1BMkg",
    authDomain: "zahngut-app-v2.firebaseapp.com",
    projectId: "zahngut-app-v2",
    storageBucket: "zahngut-app-v2.firebasestorage.app",
    messagingSenderId: "973913290067",
    appId: "1:973913290067:web:b83259587873f8fae7dda6"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Optional: Analytics (nur wenn Sie es aktiviert haben)
// const analytics = firebase.analytics();

// Firestore Settings
db.settings({
    timestampsInSnapshots: true,
    merge: true
});

// Auth State Observer
let currentUser = null;
auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (typeof handleAuthStateChange === 'function') {
        handleAuthStateChange(user);
    }
    
    // Debug-Info
    if (user) {
        console.log('✅ Firebase Auth: Angemeldet als', user.email);
    } else {
        console.log('🔓 Firebase Auth: Nicht angemeldet');
    }
});

// Connection State Monitor (Optional)
if (typeof firebase.database !== 'undefined') {
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            console.log('🔥 Firebase: Online und verbunden');
        } else {
            console.log('📴 Firebase: Offline - Lokaler Cache aktiv');
        }
    });
}

console.log('🔥 Firebase initialisiert für Projekt: zahngut-app-v2');
console.log('📊 Services verfügbar: Auth, Firestore, Storage');
