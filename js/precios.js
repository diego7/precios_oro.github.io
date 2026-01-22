import { db } from "./firebase.js";
import { ref, set, get } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* CONFIG */
const LEY_MIN = 75;
const LEY_MAX = 99;
const ONZA_API = "https://www.goldapi.io/api/XAU/USD";
const API_KEY = "goldapi-cxixsmkoojobf-io"; // 🔴 pon tu key real

/* OBTENER ONZA */
async function obtenerOnza() {
  const res = await fetch(ONZA_API, {
    headers: { "x-access-token": goldapi-cxixsmkoojobf-io }
  });
  const data = await res.json();
  return data.price;
}

/* CALCULAR TODAS LAS LEYES */
function calcularPrecios(onza, dolar, descuento) {
  const precios = {};

  for (let ley = LEY_MIN; ley <= LEY_MAX; ley++) {
    const gramoUsd = (onza / 31.1035) * (ley / 100);
    const gramoBs = gramoUsd * dolar;
    const finalBs = gramoBs * (1 - descuento / 100);

    precios[`ley_${ley}`] = {
      usd: gramoUsd.toFixed(2),
      bs: finalBs.toFixed(2)
    };
  }

  return precios;
}

/* PROCESO COMPLETO */
export async function actualizarPrecios() {
  const snap = await get(ref(db, "config"));
  if (!snap.exists()) return;

  const { dolar, descuento } = snap.val();

  const onza = await obtenerOnza();

  await set(ref(db, "config/ultima_onza"), onza);

  const precios = calcularPrecios(onza, dolar, descuento);
  await set(ref(db, "precios"), precios);
}
