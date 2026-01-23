import { obtenerOnzaTroy } from "./onza.js";
import { db } from "./firebase.js";
import { ref, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const LEY_MIN = 75;
const LEY_MAX = 99;

window.addEventListener("DOMContentLoaded", async () => {

  // 🔹 Elementos HTML
  const onzaSpan = document.getElementById("onzaValor");
  const lista = document.getElementById("lista-precios");

  if (!onzaSpan || !lista) {
    console.error("Faltan elementos HTML (onzaValor o lista-precios)");
    return;
  }

  // 🔹 Obtener onza troy
  const onza = await obtenerOnzaTroy();

  if (!onza) {
    onzaSpan.textContent = "Sin conexión";
    return;
  }

  onzaSpan.textContent = onza.toFixed(2);

  // 🔹 Obtener configuración (dólar y descuento)
  let dolar = 0;
  let descuento = 0;

  try {
    const snap = await get(ref(db, "config"));
    if (!snap.exists()) {
      console.error("No existe config en Firebase");
      return;
    }

    dolar = Number(snap.val().dolar);
    descuento = Number(snap.val().descuento);

  } catch (e) {
    console.error("Error leyendo config", e);
    return;
  }

  // 🔹 Limpiar lista
  lista.innerHTML = "";

  // 🔹 Calcular y mostrar precios
  for (let ley = LEY_MIN; ley <= LEY_MAX; ley++) {

    const gramoUsd = (onza / 31.1035) * (ley / 100);
    const gramoBs = gramoUsd * dolar * (1 - descuento / 100);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="ley">Ley ${ley}</div>
      <div class="bs">${gramoBs.toFixed(2)} Bs</div>
      <div class="usd">${gramoUsd.toFixed(2)} USD</div>
    `;

    lista.appendChild(card);
  }
});
