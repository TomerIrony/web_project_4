let body = document.querySelector('.body');
let profileEditButton = document.getElementById('openProfile');
let profileEditWindow = document.getElementById('popoutWindow');
let closeProfileWindowButton = document.getElementById('closeProfileButton');
let userFullName = document.getElementById('fullName');
let userDescription = document.getElementById('description');
let form = document.getElementById('form');
let inputName = document.getElementById('userInputfullName');
let inputDescription = document.getElementById('userInputDescription');
let newContentButton = document.getElementById('addNewContentButton');
let newContentWindow = document.getElementById('popoutWindowNewPlace')
let closeContentWindowButton = document.getElementById('closeButtonNewContent');
const cardsContainer = document.querySelector('.elements');
let cardNameInput = document.getElementById('cardNameInput');
let imageInput = document.getElementById('imageInput');
let newPlaceButton = document.getElementById('newPlaceButton');
let templateImage = document.getElementById('openCardTemplate');
let templateContainer = document.querySelector('.template__container')



function openEditProfileWindow(){
  profileEditWindow.classList.add('popout_opened');
  inputName.value = userFullName.textContent;
  inputDescription.value = userDescription.textContent;
}

function openAddNewContentWindow(){
  newContentWindow.classList.add('popout_opened');
}

function removeNewContentWindow(){
  newContentWindow.classList.remove('popout_opened');
}

function closeEditProfileWindow(){
  profileEditWindow.classList.remove('popout_opened')
}

function newSavedName(e) {
  e.preventDefault();   // stop page from refrashing after submiting
  userFullName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  closeEditProfileWindow();
}

closeContentWindowButton.addEventListener('click', removeNewContentWindow)
newPlaceButton.addEventListener('click', removeNewContentWindow)
newContentButton.addEventListener('click', openAddNewContentWindow)
closeProfileWindowButton.addEventListener('click', closeEditProfileWindow)
profileEditButton.addEventListener('click', openEditProfileWindow)
form.addEventListener('submit', newSavedName)


const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
  
]; 


function inputCard(e){
  e.preventDefault();
  addCard(cardNameInput.value, imageInput.value)
  console.log(initialCards)
}

newPlaceButton.addEventListener("click", inputCard)

function addCard(name, link){
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector(".card__name").textContent = name;
  cardImage = cardElement.querySelector("#cardImage");
  cardImage.src = link
  cardsContainer.prepend(cardElement);

  document.querySelector('.card__like-btn').addEventListener('click', function(evt){
    evt.target.classList.toggle("card__like-active")
  })

  document.querySelector('.card__close').addEventListener('click', function(evt){
    let btn = evt.target;
    let card = btn.parentElement;
    card.parentElement.removeChild(card);
  })

  
  document.getElementById('cardImage').addEventListener('click', function(evt){
    const imageTemplate = document.querySelector("#openCardTemplate").content;
    const imageElement = imageTemplate.querySelector('.template').cloneNode(true);
    const cardImageSrc = evt.target.parentElement.querySelector('#cardImage').getAttribute('src');
    const cardImageTitle = evt.target.parentElement.querySelector('.card__name').textContent;
    imageElement.querySelector('.template__image').setAttribute('src', cardImageSrc);
    imageElement.querySelector('.template__caption').textContent = cardImageTitle;
    templateContainer.append(imageElement);
    document.getElementById('imageClose').addEventListener('click', function(){
      template = document.querySelector('.template');
      template.remove();
    })
  })
  
}


for (const card of initialCards){
  addCard(card.name, card.link)}





