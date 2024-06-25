const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();
const filterButtons = document.querySelectorAll(".filter-list button");
let petsList = document.querySelector(".bottom-section__list");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    petsList.innerHTML = "";
    petsArea();
  });
});

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

/**
 * Calculates the age of a pet based on the provided birth year and returns a formatted age text.
 *
 * @param {number} petage - The birth year of the pet
 * @return {string} The formatted age text of the pet
 */
function createAgeText(petage) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - petage;
  let ageText = age > 1 ? `${age} years old` : `${age} year old`;
  ageText = age < 1 ? `Less than a year old` : ageText;
  return ageText;
}

let pets = [];

async function loadPets() {
  const petsPromise = await fetch(
    "https://petsadoption.netlify.app/.netlify/functions/pets"
  );
  pets = await petsPromise.json();
  petsArea();
}

function petsArea() {
  const activeButton = document.querySelector(".filter-list .active");

  pets.forEach(pet => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".bottom-section__item").dataset.species = pet.species;

    if (
      pet.species == activeButton.dataset.filter ||
      activeButton.dataset.filter == "all"
    ) {
      clone.querySelector(".bottom-section__item").style.display = "grid";
    } else {
      clone.querySelector(".bottom-section__item").style.display = "none";
    }

    clone.querySelector(".item__name").textContent = pet.name;
    clone.querySelector(".item__description").textContent = pet.description;
    clone.querySelector(".item__age").textContent = createAgeText(
      pet.birthYear
    );

    if (!pet.photo) pet.photo = "images/fallback.jpg";
    clone.querySelector(".item__image img").setAttribute("src", pet.photo);
    clone
      .querySelector(".item__image img")
      .setAttribute("alt", `a ${pet.species} named ${pet.name}`);

    wrapper.appendChild(clone);
  });

  petsList.appendChild(wrapper);
}

loadPets();
