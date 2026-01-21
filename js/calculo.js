import { db } from "./firebase.js";
import { ref, onValue } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let onza=0, dolar=0, descuento=0;

const leySel = document.getElementById("ley");
const resultado = document.getElementById("resultado");

// cargar leyes 75–99
for(let i=75;i<=99;i++){
  leySel.innerHTML += `<option value="${i}">${i}</option>`;
}

// leer config en tiempo real
onValue(ref(db,"config"), snap=>{
  const d = snap.val();
  onza = d.onza;
  dolar = d.dolar;
  descuento = d.descuento;
  calcular();
});

leySel.addEventListener("change", calcular);

function calcular(){
  const ley = leySel.value;
  const precio =
    ((onza * dolar) / 31.1035) *
    (ley / 100) *
    (1 - descuento / 100);

  resultado.innerText = precio.toFixed(2);
}
