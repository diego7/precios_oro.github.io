import { db } from "./firebase.js";
import { ref, onValue } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const lista = document.getElementById("lista");
const onzaTxt = document.getElementById("onza");

onValue(ref(db,"config"), snap => {
  const { onza, dolar, descuento } = snap.val();

  onzaTxt.innerText = onza.toFixed(2);
  lista.innerHTML = "";

  for(let ley=74; ley<=99; ley++){
    const usd = ((onza/31.1035)*(ley/100))*(1-descuento/100);
    const bs  = usd * dolar;

    lista.innerHTML += `
      <div class="fila">
        <span>LEY ${ley}.00</span>
        <span>${bs.toFixed(2)} Bs</span>
        <span>${usd.toFixed(2)} $us</span>
      </div>
    `;
  }
});
