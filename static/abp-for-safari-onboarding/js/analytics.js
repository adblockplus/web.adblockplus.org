// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics, setUserId, logEvent } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZAdrmwP9-sbYzIPFsQrYNfWRCnhAlCkE",
    authDomain: "eyeo-nasapp.firebaseapp.com",
    databaseURL: "https://eyeo-nasapp-default-rtdb.firebaseio.com",
    projectId: "eyeo-nasapp",
    storageBucket: "eyeo-nasapp.appspot.com",
    messagingSenderId: "319546247729",
    appId: "1:319546247729:web:45c4c172da5ab0b20aa310",
    measurementId: "G-1ZMGMVYFSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Read from URL
const params = new URLSearchParams(window.location.search);
const userId = params.get('user_id');

if (userId) {
    setUserId(analytics, userId);
}

// Get current page information
const pagePath = window.location.pathname;
const pageName = pagePath.split('/').pop().replace('.html', '');

logEvent(analytics, 'page_view', {
    page_title: document.title,
    page_path: pagePath,
    page_name: pageName
});

console.log(`Analytics event logged: page_view for ${pageName}`);