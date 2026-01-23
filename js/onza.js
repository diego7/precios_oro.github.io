export async function obtenerOnzaTroy() {

  // 🔹 API 1 (metals.live)
  try {
    const r1 = await fetch("https://api.metals.live/v1/spot/gold");
    const d1 = await r1.json();
    const onza1 = Number(d1[0][1]);
    if (!isNaN(onza1)) return onza1;
  } catch (e) {
    console.warn("metals.live falló");
  }

  // 🔹 API 2 (goldprice.org vía JSON público)
  try {
    const r2 = await fetch("https://data-asg.goldprice.org/dbXRates/USD");
    const d2 = await r2.json();
    const onza2 = Number(d2.items[0].xauPrice);
    if (!isNaN(onza2)) return onza2;
  } catch (e) {
    console.warn("goldprice falló");
  }

  // ❌ Si todo falla
  return null;
}
