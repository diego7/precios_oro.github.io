import { db } from "./firebase.js";
import { ref, update } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.guardar = () => {
  update(ref(db,"config"),{
    onza: parseFloat(onza.value),
    dolar: parseFloat(dolar.value),
    descuento: parseFloat(descuento.value)
  });
  alert("Datos actualizados en tiempo real");
};
