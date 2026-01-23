import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location = "login.html";
    return;
  }

  const snap = await get(ref(db, `usuarios/${user.uid}`));
  if (!snap.exists()) {
    window.location = "login.html";
    return;
  }

  const u = snap.val();
  if (new Date() > new Date(u.fecha_limite) || !u.activo) {
    alert("Acceso vencido");
    auth.signOut();
    window.location = "login.html";
  }





  
const localToken = localStorage.getItem("sessionToken");

if (!localToken) {
  auth.signOut();
  window.location = "login.html";
  return;
}

// 🔥 ESCUCHAR CAMBIOS DE TOKEN (SESION ÚNICA)
onValue(ref(db, `usuarios/${user.uid}/sessionToken`), snap => {
  if (!snap.exists()) return;

  const tokenDB = snap.val();

  if (tokenDB !== localToken) {
    alert("Tu sesión fue abierta en otro dispositivo");
    auth.signOut();
    localStorage.removeItem("sessionToken");
    window.location = "login.html";
  }
});




  
});

