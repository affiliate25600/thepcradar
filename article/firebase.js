// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXfs9Fl89aY7IKiMmSoRrLSn9ceccPd9c",
    authDomain: "the-pc-radar.firebaseapp.com",
    databaseURL: "https://the-pc-radar-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "the-pc-radar",
    storageBucket: "the-pc-radar.firebasestorage.app",
    messagingSenderId: "528085543264",
    appId: "1:528085543264:web:e1fdcb60aa5a67e9dc9605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const dbRef = ref(db);

function productClick(productName) {
    get(child(dbRef, "/product-clicks/" + productName)).then((snapshot) => {
        if (snapshot.exists) {
            set(ref(db, "/product-clicks/" + productName), snapshot.val() + 1);
        } else {
            set(ref(db, "/product-clicks/" + productName), 1);
        }
    });
}

async function getArticleVote(article) {
    const snapshot = await get(child(dbRef, "/article-vote/" + article));
    return snapshot.exists() ? snapshot.val() : 0;
}

function changeArticleVote(article, change) {
    get(child(dbRef, "/article-vote/" + article)).then((snapshot) => {
        if (snapshot.exists) {
            set(ref(db, "/article-vote/" + article), snapshot.val() + change);
        } else {
            set(ref(db, "/article-vote/" + article), change);
        }
    });
}

window.productClick = productClick;
window.getArticleVote = getArticleVote;
window.changeArticleVote = changeArticleVote;