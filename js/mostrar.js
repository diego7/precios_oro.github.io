import { db } from "./firebase.js";
import { ref, onValue } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const lista = document.getElementById("lista-precios");
const onzaTxt = document.getElementById("onzaValor");

onValue(ref(db, "config/ultima_onza"), snap => {
  if (snap.exists()) {
    onzaTxt.textContent = snap.val().toFixed(2);
  }
});

onValue(ref(db, "precios"), snap => {
  if (!snap.exists()) return;

  lista.innerHTML = "";

  const data = snap.val();
  Object.keys(data).forEach(key => {
    const ley = key.replace("ley_", "");
    const p = data[key];

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Ley ${ley}</strong><br>
      ${p.bs} Bs<br>
      ${p.usd} USD
    `;
    lista.appendChild(div);
  });
});
