import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, onValue } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("guard.js activo");

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const uid = user.uid;
  const localToken = localStorage.getItem("sessionToken");

  if (!localToken) {
    signOut(auth);
    window.location.href = "login.html";
    return;
  }

  const tokenRef = ref(db, `usuarios/${uid}/sessionToken`);

  // 🔥 ESCUCHA EN TIEMPO REAL
  onValue(tokenRef, (snap) => {
    if (!snap.exists()) return;

    const tokenDB = snap.val();

    console.log("Token DB:", tokenDB);
    console.log("Token local:", localToken);

    if (tokenDB !== localToken) {
      alert("Tu cuenta fue abierta en otro dispositivo");
      localStorage.removeItem("sessionToken");
      signOut(auth);
      window.location.href = "login.html";
    }
  });
});


