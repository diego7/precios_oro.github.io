import { db } from "./firebase.js";
import { ref, set, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("calculo.js cargado");

const LEY_MIN = 75;
const LEY_MAX = 99;

// 🔹 ONZA TEMPORAL (luego será API real)
function obtenerOnza() {
  return 4100; // prueba
}

export async function recalcularPrecios() {
  console.log("recalcularPrecios ejecutado");

  const snap = await get(ref(db, "config"));
  if (!snap.exists()) {
    console.error("No existe config");
    return;
  }

  const { dolar, descuento } = snap.val();
  const onza = obtenerOnza();

  // 🔥 ESTA LÍNEA ES CLAVE
  await set(ref(db, "config/ultima_onza"), onza);

  const precios = {};

  for (let ley = LEY_MIN; ley <= LEY_MAX; ley++) {
    const gramoUsd = (onza / 31.1035) * (ley / 100);
    const gramoBs = gramoUsd * dolar * (1 - descuento / 100);

    precios[`ley_${ley}`] = {
      usd: gramoUsd.toFixed(2),
      bs: gramoBs.toFixed(2)
    };
  }

  // 🔥 Y ESTA TAMBIÉN
  await set(ref(db, "precios"), precios);

  console.log("Precios y onza guardados");
}
