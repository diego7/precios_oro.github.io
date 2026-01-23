import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, get, set } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("auth.js cargado");

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo");

  const btn = document.getElementById("btnLogin");

  if (!btn) {
    console.error("No existe btnLogin");
    return;
  }

  btn.addEventListener("click", async () => {
    console.log("click login");

    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      
      // 🔐 GENERAR TOKEN DE SESIÓN ÚNICO
const token = crypto.randomUUID();

// Guardar token en Firebase
await set(ref(db, `usuarios/${uid}/sessionToken`), token);

// Guardar token en el navegador
localStorage.setItem("sessionToken", token);

      

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

      window.location.href = u.role === "admin"
        ? "admin.html"
        : "index.html";

    } catch (e) {
      alert("Error de login");
      console.error(e);
    }
  });
});

