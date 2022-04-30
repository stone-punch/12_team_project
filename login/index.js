//Import the functions you need from the SDKs you need 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js"; 
const firebaseConfig = { apiKey: "AIzaSyBdHq8r4EMKfC1d3kug8xOnv14Ui-TA_Hg", 
    authDomain: "petper-14f9d.firebaseapp.com",
    databaseURL: "https://petper-14f9d-default-rtdb.firebaseio.com", 
    projectId: "petper-14f9d", 
    storageBucket: "petper-14f9d.appspot.com", 
    messagingSenderId: "382691123578", 
    appId: "1:382691123578:web:975408487ddb2e5fde76c3", 
    measurementId: "G-71HYZ44KRJ"
}; // Initialize Firebase 
const app = initializeApp(firebaseConfig); 
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"; 
const db = getDatabase(); 
const id = document.getElementById('id');
const password = document.getElementById('password'); 
const submit = document.getElementById('subBtn'); 

function AuthenticateUser(){ 
    const dbref = ref(db); 
    get(child(dbref, "UsersList/"+ id.value)).then((snapshot)=>{ 
        if(snapshot.exists()){ 
            let dbpass = decPass(snapshot.val().password); 
            if(dbpass == password.value){ 
                login(snapshot.val()); } 
            else{ 
                alert("비밀번호가 잘못되었습니다."); 
            } 
        } 
        else{ 
            alert("존재하지 않는 아이디입니다.") 
        } 
    }); 
} 

function decPass(dbpass){ 
    var pass12 = CryptoJS.AES.decrypt(dbpass, password.value);
    return pass12.toString(CryptoJS.enc.Utf8);
} 

function login(user){ 
    localStorage.setItem('user', JSON.stringify(user)); 
    window.location="/index.html"; 
} 

submit.addEventListener('click', AuthenticateUser);