export async function obtenerOnzaTroy() {
  try {
    const res = await fetch(
      "https://scanner.tradingview.com/crypto/scan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          symbols: {
            tickers: ["OANDA:XAUUSD"],
            query: { types: [] }
          },
          columns: ["close"]
        })
      }
    );

    const data = await res.json();
    const onza = data?.data?.[0]?.d?.[0];

    return isNaN(onza) ? null : Number(onza);

  } catch (e) {
    console.error("TradingView falló", e);
    return null;
  }
}

