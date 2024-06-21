async function getTemperatureOfMiami() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );
  const weather = await weatherPromise.json();
  document.getElementById("miami-temperature").textContent = parseFloat(
    (((weather.properties.periods[0].temperature - 32) * 5) / 9).toFixed(1)
  );
}

getTemperatureOfMiami();
