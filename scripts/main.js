const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

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
function createAgeText(petage) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - petage;
  let ageText = age > 1 ? `${age} years old` : `${age} year old`;
  ageText = age < 1 ? `Less than a year old` : ageText;
  return ageText;
}
async function petsArea() {
  const petsPromise = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const pets = await petsPromise.json();
  pets.forEach(pet => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".item__name").textContent = pet.name;
    clone.querySelector(".item__description").textContent = pet.description;
    clone.querySelector(".item__age").textContent = createAgeText(
      pet.birthYear
    );
    clone.querySelector(".item__image img").setAttribute("src", pet.photo);
    clone
      .querySelector(".item__image img")
      .setAttribute("alt", `a ${pet.species} named ${pet.name}`);

    wrapper.appendChild(clone);
  });

  document.querySelector(".bottom-section__list").appendChild(wrapper);
}

petsArea();
