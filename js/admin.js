import { db } from "./firebase.js";
import { ref, get, update } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("admin.js cargado");

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM admin listo");

  const btn = document.getElementById("btnGuardar");
  const dolarInput = document.getElementById("dolar");
  const descuentoInput = document.getElementById("descuento");

  if (!btn || !dolarInput || !descuentoInput) {
    console.error("Faltan elementos HTML");
    return;
  }

  // Cargar config actual
  const snap = await get(ref(db, "config"));
  if (snap.exists()) {
    dolarInput.value = snap.val().dolar;
    descuentoInput.value = snap.val().descuento;
  }

  btn.addEventListener("click", async () => {
    console.log("CLICK GUARDAR");

    const dolar = parseFloat(dolarInput.value);
    const descuento = parseFloat(descuentoInput.value);

    if (isNaN(dolar) || isNaN(descuento)) {
      alert("Valores inválidos");
      return;
    }

    await update(ref(db, "config"), {
      dolar,
      descuento
    });

    alert("Configuración guardada");
  });
});
