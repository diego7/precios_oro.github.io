export async function obtenerOnzaTroy() {
  try {
    const res = await fetch("https://stooq.com/q/l/?s=xauusd&i=d");
    const text = await res.text();

    const lines = text.trim().split("\n");
    if (lines.length < 2) return null;

    const cols = lines[1].split(",");
    const onza = Number(cols[4]); // Close price

    return isNaN(onza) ? null : onza;

  } catch (e) {
    console.error("Error obteniendo onza (stooq)", e);
    return null;
  }
}

