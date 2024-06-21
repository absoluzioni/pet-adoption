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

async function petsArea() {
  const petsPromise = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const pets = await petsPromise.json();
  pets.forEach(pet => {
    const li = document.createElement("li");
    li.textContent = `${pet.name} the ${pet.species}`;
    document.querySelector("#list").appendChild(li);
  });
}

petsArea();
