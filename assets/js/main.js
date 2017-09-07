//--------------------------------------------------------------
axios.defaults.baseURL = 'https://dog.ceo';

//get request to a list of names of dogs
axios.get('/api/breeds/list')
  .then(function (response) {
    //call function
    renderBreeds(response.data.message);
  })
  .catch(function (error) {
    console.log(error);
  });

//creates new <li> in <ul>
let breedTemplate = (name, index) => {
  return `<li class="breed">
    <a href="#" class="breed__link" data-index="${index}">
      <strong class="breed__title">${name}</strong>
    </a>
  </li>`;
}

//creates <ul> with names of dogs
function renderBreeds(arr){
  let breedsList = document.querySelector('.breeds');
  let breedsHTML = '';

  arr.forEach((item, index) => {
    breedsHTML += breedTemplate(item, index);
  });
  breedsList.innerHTML = breedsHTML;
  //now we have <li> elements with .breed__link references inside
  //add event listener to all formed elements
  let breedsLink = document.querySelectorAll('.breed__link');
  for ( i = 0; i < breedsLink.length; i++) {
    breedsLink[i].addEventListener("click", function(event) {
      event.preventDefault();
      createBreedGallery(getBreedName(this));
      showGallery();
    });
  }

  arr.forEach((item, index) => {
    // console.log(item);
    axios.get(`/api/breed/${item}/images/random`)
      .then(function (response) {
        // console.log(response.data.message);
        // add received image's url to each <li>
        document.querySelector(`[data-index="${index}"]`).style.backgroundImage = `url("${response.data.message}")`;

      })
  });
}
//--------------------------------------------------------------
//finds the name of the breed which was clicked
function getBreedName(link) {
  return link.innerText.toLowerCase();
}
//creates section .gallery with all images in arr
function renderGallery(arr) {
  let parentNode = document.querySelector(".gallery");
  // //delete all previous content and create a button to go back
  // // parentNode.innerHTML = "";
  // let button = document.createElement('button');
  // button.classList.add('gallery__button');
  // button.innerText = "Go back";
  // galleryDiv.appendChild(button);
  // console.log(button);
  arr.forEach(item => {
    let childNode = document.createElement("img");
    childNode.src = item;
    childNode.classList.add("gallery__item");
    parentNode.appendChild(childNode);
    // console.log(childNode);
  });
  createMasonry(parentNode);
}
//create Masonry object
function createMasonry(element) {
  //using Images Loaded in .gallery section
  //"You images done yet or what?"
  let imgLoad = imagesLoaded('.gallery');
  imgLoad.on( 'always', function() {
    console.log( imgLoad.images.length + ' images loaded' );
    //creates Masonry object from .gallery
    let msnry = new Masonry( element, {
      // options
      itemSelector: ".gallery__item"
    });
    // detect which image is broken
    for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
      var image = imgLoad.images[i];
      var result = image.isLoaded ? 'loaded' : 'broken';
      console.log( 'image is ' + result + ' for ' + image.img.src );
    }
  });
}
//creates section .gallery
function createBreedGallery(breed) {
  axios.get(`/api/breed/${breed}/images`)
  .then(function (response) {
    //call function
    renderGallery(response.data.message);
  })
  .catch(function (error) {
    console.log(error);
  });
}
//--------------------------------------------------------------
function showGallery() {
  let mainDiv = document.querySelector('.main');
  mainDiv.style.left = "-100%";
  let galleryDiv = document.querySelector('.gallery');
  galleryDiv.style.left = "0%";
  //create a button to go back
  // parentNode.innerHTML = "";
  let button = document.createElement('button');
  button.classList.add('gallery__button');
  button.innerText = "Go back";
  galleryDiv.appendChild(button);
  console.log(button);
  button.addEventListener('click', function(){
    mainDiv.style.left = "0%";
    galleryDiv.style.left = "100%";
    //delete all previous content
    galleryDiv.innerHTML = "";
  })
}
