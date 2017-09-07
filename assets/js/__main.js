axios.defaults.baseURL = 'https://dog.ceo';

axios.get('/api/breeds/list')
  .then(function (response) {
    renderBreeds(response.data.message);
  })
  .catch(function (error) {
    console.log(error);
  });

let breedTemplate = (name, img) => {
  return `<li class="breed">
    <a href="#" class="breed__link" style="background-image: url('${img}')">
      <strong class="breed__title">${name}</strong>
    </a>
  </li>`;
}


function renderBreeds(arr){

  let breedsList = document.querySelector('.breeds');
  let breedsHTML = '';
  let promises = [];

  arr.forEach(item => {
    promises.push(axios.get(`/api/breed/${item}/images/random`));
  });

  axios.all(promises).then(function(results) {
    console.log(results);
      results.forEach(function(response, index) {
          breedsHTML += breedTemplate(arr[index], response.data.message);
      });
      breedsList.innerHTML = breedsHTML;
  });

}
