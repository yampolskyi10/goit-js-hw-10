

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_MqUIFRPy83K6Bi2MJIWDpxqnQonqyxE9xR1Z3Mf3faczvggV2fYCJXnV37Hktq1G"; 

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data);
}

export function fetchCatByBreed(selectedBreedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`)
    .then(response => response.data);
}
