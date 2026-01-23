export async function obtenerOnzaTroy() {
  try {
    const url = "https://api.metals.live/v1/spot/gold";
    const proxy = "https://thingproxy.freeboard.io/fetch/";

    const res = await fetch(proxy + url);
    const data = await res.json();

    // Formato: [["gold", precio, timestamp]]
    const onza = Number(data[0][1]);

    if (isNaN(onza)) return null;
    return onza;

  } catch (e) {
    console.error("Error obteniendo onza troy:", e);
    return null;
  }
}

