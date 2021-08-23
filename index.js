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
const newPlaceButton = document.getElementById('newPlaceButton');
const templateImage = document.getElementById('openCardTemplate');
const templateContainer = document.querySelector('.template-container')

function closePopout(popout){
  popout.classList.remove('popout_opened');
}

function openPopout(popout){
  popout.classList.add('popout_opened');
}

profileEditButton.addEventListener('click', function(){
  openPopout(profileEditWindow)
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




newPlaceButton.addEventListener("click", inputCard)

function addCard(name, link){
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector(".card__name").textContent = name;
  const cardImage = cardElement.querySelector("#cardImage");
  cardImage.src = link
  cardImage.alt = cardElement.querySelector(".card__name").textContent;
  cardsContainer.prepend(cardElement);

  cardElement.querySelector('.card__like-btn').addEventListener('click', function(evt){
    evt.target.classList.toggle("card__like-active")
  })

  cardElement.querySelector('.card__close').addEventListener('click', function(evt){
    const btn = evt.target;
    const card = btn.parentElement;
    card.parentElement.removeChild(card);
  })

  document.getElementById('cardImage').addEventListener('click', function(evt){ 
    const cardImageSrc = evt.target.parentElement.querySelector('#cardImage').getAttribute('src');
    const cardImageTitle = evt.target.parentElement.querySelector('.card__name').textContent;
    const popoutImage = document.querySelector('#imageOpened')
    const popoutImageCloseButton = document.getElementById('popoutImageCloseButton');
    document.querySelector('.popout__image').setAttribute('src', cardImageSrc);
    document.querySelector('.popout__caption').textContent = cardImageTitle;
    document.querySelector('.popout__image').alt = document.querySelector('.popout__caption').textContent = cardImageTitle;
    popoutImage.classList.add('popout_opened')
    popoutImageCloseButton.addEventListener('click', function(){
      popoutImage.classList.remove('popout_opened')
    })

    })

  }

  newContentButton.addEventListener('click', function(){
    openPopout(newContentWindow)
  })
  
  closeContentWindowButton.addEventListener('click', function(){
    closePopout(newContentWindow)
  })


  function inputCard(e){
    e.preventDefault();
    addCard(cardNameInput.value, imageInput.value)
    closePopout(newContentWindow)  
  }
  



for (const card of initialCards){
  addCard(card.name, card.link)}





