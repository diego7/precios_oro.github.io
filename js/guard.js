import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("guard.js activo");

let uid = null;
let localToken = null;

async function verificarSesion() {
  if (!uid || !localToken) return;

  const snap = await get(ref(db, `usuarios/${uid}/sessionToken`));
  if (!snap.exists()) return;

  const tokenDB = snap.val();

  console.log("CHECK token DB:", tokenDB);
  console.log("CHECK token local:", localToken);

  if (tokenDB !== localToken) {
    alert("Tu cuenta fue abierta en otro dispositivo");
    localStorage.removeItem("sessionToken");
    signOut(auth);
    window.location.href = "login.html";
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  uid = user.uid;
  localToken = localStorage.getItem("sessionToken");

  if (!localToken) {
    signOut(auth);
    window.location.href = "login.html";
    return;
  }

  // 1️⃣ Verificación inmediata
  await verificarSesion();

  // 2️⃣ Verificación periódica (CADA 5 SEGUNDOS)
  setInterval(verificarSesion, 5000);

  // 3️⃣ Verificación al volver al foco
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      verificarSesion();
    }
  });
});
