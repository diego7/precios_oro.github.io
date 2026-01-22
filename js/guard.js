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
});
