export async function obtenerOnzaTroy() {
  try {
    const res = await fetch("https://api.metals.live/v1/spot/gold");
    const data = await res.json();

    // formato: [["gold", precio, timestamp]]
    return Number(data[0][1]);

  } catch (err) {
    console.error("Error obteniendo onza", err);
    return null;
  }
}
