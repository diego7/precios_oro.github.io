import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = cred.user.uid;

    const snap = await get(ref(db, `usuarios/${uid}`));
    if (!snap.exists()) {
      alert("Usuario no registrado");
      return;
    }

    const u = snap.val();
    const hoy = new Date();
    const limite = new Date(u.fecha_limite);

    if (!u.activo || hoy > limite) {
      alert("Acceso vencido");
      return;
    }

    if (u.role === "admin") {
      window.location = "admin.html";
    } else {
      window.location = "index.html";
    }

  } catch (e) {
    alert("Error de login");
  }
}
