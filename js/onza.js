export async function obtenerOnzaTroy() {
  try {
    const res = await fetch("https://api.metals.live/v1/spot/gold");
    const data = await res.json();

    // Formato: [["gold", precio, timestamp]]
    return Number(data[0][1]);

  } catch (e) {
    console.error("Error obteniendo onza troy", e);
    return null;
  }
}
