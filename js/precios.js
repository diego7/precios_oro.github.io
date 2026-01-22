import { db } from "./firebase.js";
import { ref, set } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("precios.js cargado");

export async function actualizarPrecios() {
  console.log("actualizarPrecios ejecutado");

  const preciosTest = {
    ley_75: { usd: "100", bs: "700" },
    ley_76: { usd: "101", bs: "707" }
  };

  await set(ref(db, "precios"), preciosTest);
  await set(ref(db, "config/ultima_onza"), 9999);

  console.log("datos escritos en firebase");
}
