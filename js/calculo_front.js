import { obtenerOnzaTroy } from "./onza.js";
import { db } from "./firebase.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const LEY_MIN = 75;
const LEY_MAX = 99;

window.addEventListener("DOMContentLoaded", async () => {

  const onza = await obtenerOnzaTroy();
  if (!onza) return;

  document.getElementById("onzaValor").textContent = onza.toFixed(2);

  const snap = await get(ref(db, "config"));
  const { dolar, descuento } = snap.val();

  const lista = document.getElementById("lista-precios");
  lista.innerHTML = "";

  for (let ley = LEY_MIN; ley <= LEY_MAX; ley++) {
    const gramoUsd = (onza / 31.1035) * (ley / 100);
    const gramoBs = gramoUsd * dolar * (1 - descuento / 100);

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Ley ${ley}</strong><br>
      ${gramoBs.toFixed(2)} Bs<br>
      ${gramoUsd.toFixed(2)} USD
    `;

    lista.appendChild(div);
  }
});
