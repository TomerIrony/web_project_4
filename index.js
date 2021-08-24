const body = document.querySelector('.body');
const profileEditButton = document.getElementById('openProfile');
const profileEditWindow = document.getElementById('popoutWindow');
const closeProfileWindowButton = document.getElementById('closeProfileButton');
const userFullName = document.getElementById('fullName');
const userDescription = document.getElementById('description');
const form = document.getElementById('form');
const inputName = document.getElementById('userInputfullName');
const inputDescription = document.getElementById('userInputDescription');
const newContentButton = document.getElementById('addNewContentButton');
const newContentWindow = document.getElementById('popoutWindowNewPlace')
const closeContentWindowButton = document.getElementById('closeButtonNewContent');
const cardsContainer = document.querySelector('.elements');
const cardNameInput = document.getElementById('cardNameInput');
const imageInput = document.getElementById('imageInput');
const newPlaceButton = document.getElementById('popoutWindowNewPlace');
const templateImage = document.getElementById('openCardTemplate');
const templateContainer = document.querySelector('.template-container')
const popoutImageCross = document.getElementById('popoutImageCloseButton');
const popoutImage = document.querySelector('#imageOpened')

function closePopout(popout){
  if(popout.target == popoutImageCross){
    popoutImage.classList.remove('popout_opened');
  }
  else{
  popout.classList.remove('popout_opened');
  }
}

function openPopout(popout){
  popout.classList.add('popout_opened');
}

profileEditButton.addEventListener('click', function(){
  openPopout(profileEditWindow);
  inputName.value = userFullName.textContent;
  inputDescription.value = userDescription.textContent;
})

closeProfileWindowButton.addEventListener('click', function(){
  closePopout(profileEditWindow)
})

form.addEventListener('submit', function(e){
  e.preventDefault();   // stop page from refrashing after submiting
  userFullName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  closePopout(profileEditWindow);
})

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

const filledHeart = function(evt){
  evt.target.classList.toggle("card__like-active");
}

const imagePopout = function(evt){
  const cardImageSrc = evt.target.parentElement.querySelector('#cardImage').getAttribute('src');
  const cardImageTitle = evt.target.parentElement.querySelector('.card__name').textContent;
  popoutImage.classList.add('popout_opened')
  document.querySelector('.popout__image').setAttribute('src', cardImageSrc);
  document.querySelector('.popout__caption').textContent = cardImageTitle;
  document.querySelector('.popout__image').alt = document.querySelector('.popout__caption').textContent = cardImageTitle;
popoutImage.querySelector('#popoutImageCloseButton').addEventListener('click', closePopout)
  }




function addCard(name, link){
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector(".card__name").textContent = name;
  const cardImage = cardElement.querySelector("#cardImage");
  cardImage.src = link
  cardImage.alt = cardElement.querySelector(".card__name").textContent;
 /* cardsContainer.prepend(cardElement);*/
  cardElement.querySelector('.card__like-btn').addEventListener('click', filledHeart)
  cardElement.querySelector('.card__close').addEventListener('click', function(evt){
    const btn = evt.target;
    const card = btn.parentElement;
    card.parentElement.removeChild(card);
  })
  cardElement.querySelector('.card__image').addEventListener('click', imagePopout)
  return cardElement;
  }

  initialCards.forEach(function(card){
    cardsContainer.prepend(addCard(card.name, card.link));
  })

  newContentButton.addEventListener('click', function(){
    openPopout(newContentWindow)
    cardNameInput.value = ''
    imageInput.value = ''
  })
  closeContentWindowButton.addEventListener('click', function(){
    closePopout(newContentWindow)
  })

function inputCard(e){
    e.preventDefault();
    cardsContainer.prepend(addCard(cardNameInput.value, imageInput.value))
    closePopout(newContentWindow)  
  }

  newPlaceButton.addEventListener("submit", inputCard)
  



