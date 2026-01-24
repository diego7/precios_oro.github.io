import { obtenerOnzaTroy } from "./onza.js";
import { db } from "./firebase.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const LEY_MIN = 75;
const LEY_MAX = 99;

window.addEventListener("DOMContentLoaded", async () => {

  const onzaSpan = document.getElementById("onzaValor");
  const lista = document.getElementById("lista-precios");

  if (!onzaSpan || !lista) return;

  // 🔹 SOLO al entrar
  const onza = await obtenerOnzaTroy();
  if (!onza) {
    onzaSpan.textContent = "No disponible";
    return;
  }

  onzaSpan.textContent = onza.toFixed(2);

  const snap = await get(ref(db, "config"));
  if (!snap.exists()) return;

  const { dolar, descuento } = snap.val();

  lista.innerHTML = "";

  for (let ley = LEY_MIN; ley <= LEY_MAX; ley++) {
    const grUsd = (onza / 31.1035) * (ley / 100);
    const grBs = grUsd * dolar * (1 - descuento / 100);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="ley">Ley ${ley}</div>
      <div class="bs">${grBs.toFixed(2)} Bs</div>
      <div class="usd">${grUsd.toFixed(2)} USD</div>
    `;
    lista.appendChild(card);
  }
});
