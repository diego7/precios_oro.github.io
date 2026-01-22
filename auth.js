import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const btn = document.getElementById("btnLogin");

btn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (!email || !pass) {
    alert("Completa correo y contraseña");
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = cred.user.uid;

    const snap = await get(ref(db, `usuarios/${uid}`));
    if (!snap.exists()) {
      alert("Usuario no autorizado");
      return;
    }

    const u = snap.val();

    if (!u.activo || new Date() > new Date(u.fecha_limite)) {
      alert("Acceso vencido");
      return;
    }

    if (u.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (err) {
    alert("Error de login");
    console.error(err);
  }
});
