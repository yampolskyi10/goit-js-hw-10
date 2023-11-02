import axios from "axios";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = "live_MqUIFRPy83K6Bi2MJIWDpxqnQonqyxE9xR1Z3Mf3faczvggV2fYCJXnV37Hktq1G"; 


function fetchBreeds() {
  axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      const breeds = response.data;
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Помилка \ списку порід:", error);
      showError();
    });
}


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
}


function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';

  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`)
    .then(response => displayCatInfo(response.data))
    .catch(error => {
      console.error("Помилка при завантаженні інформації про кота:", error);
      showError();
    });
});


fetchBreeds();
