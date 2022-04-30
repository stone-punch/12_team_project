import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js"; 
const firebaseConfig = { 
    apiKey: "AIzaSyBdHq8r4EMKfC1d3kug8xOnv14Ui-TA_Hg", 
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
const email = document.getElementById('email');
const password = document.getElementById('password'); 
const submit = document.getElementById('signUpButton'); 
const gotologin = document.getElementById('gotoLoginButton'); 
function RegisterUser(){ 
    const dbref = ref(db);
    get(child(dbref, "UsersList/"+id.value)).then((snapshot)=>{ 
        if(snapshot.exists()){ 
            alert("이미 있는 계정입니다."); 
        } 
        else{ 
            set(ref(db, "UsersList/"+ id.value), 
            { 
                id: id.value, 
                email: email.value, 
                password: encPass() 
            }).then(()=>{ alert("성공적으로 가입되었습니다."); }) 
            .catch((error)=>{ alert("error"+error); }) 
        } 
    }); 
} 

function encPass(){ 
    var pass12 = CryptoJS.AES.encrypt(password.value, password.value); 
    return pass12.toString(); 
} 

submit.addEventListener('click', RegisterUser);