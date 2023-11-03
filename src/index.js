
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function displayCatInfo(catData) {
  const cat = catData[0];
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="фото">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Темперамент: ${cat.breeds[0].temperament}</p>
  `;
  catInfo.style.display = 'block';
  loader.style.display = 'none';
  hideError();
}

function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
}

function hideError() {
  error.style.display = 'none';
}


error.style.display = 'none';

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';
  hideError();
  catInfo.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(response => displayCatInfo(response))
    .catch(error => {
      console.error("Помилка при завантаженні інформації про кота:", error);
      showError();
      loader.style.display = 'none';
    });
});

fetchBreeds()
  .then(response => {
    response.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    loader.style.display = 'none';
  })
  .catch(error => {
    console.error("Помилка при завантаженні списку порід:", error);
    showError();
    loader.style.display = 'none';
  });
