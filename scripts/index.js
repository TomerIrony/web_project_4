import {validationConfig, FormValidation} from "./FormValidator.js"
import Card from "./Card.js"
import {popupImageContainer, openPopup} from "./utils.js"

const profileEditButton = document.getElementById('openProfile');
const profileEditWindow = document.getElementById('popoutWindow');
const closeProfileWindowButton = document.getElementById('closeProfileButton');
const userFullName = document.getElementById('fullName');
const userDescription = document.getElementById('description');
const formEditProfile = document.getElementById('editProfileForm');
const inputName = document.getElementById('userInputfullName');
const inputDescription = document.getElementById('userInputDescription');
const newContentButton = document.getElementById('addNewContentButton');
const newContentWindow = document.getElementById('popoutWindowNewPlace');
const closeContentWindowButton = document.getElementById('closeButtonNewContent');
const cardsContainer = document.querySelector('.elements');
const cardNameInput = document.getElementById('cardNameInput');
const imageInput = document.getElementById('imageInput');
const saveNewImage = document.getElementById('newPlaceButton');
const saveInputProfileButton = document.getElementById('saveInputProfileButton');
const validatorEditProfile = new FormValidation(validationConfig ,formEditProfile)
const validatorAddCard = new FormValidation(validationConfig ,newContentWindow)


profileEditButton.addEventListener('click', function() {
	openPopup(profileEditWindow);
	inputName.value = userFullName.textContent;
	inputDescription.value = userDescription.textContent;
});

closeProfileWindowButton.addEventListener('click', function() {
	closePopup(profileEditWindow);
});


formEditProfile.addEventListener('submit', function() {
	userFullName.textContent = inputName.value;
	userDescription.textContent = inputDescription.value;
	closePopup(profileEditWindow);
  validatorAddCard._defaultButtonDisable(saveInputProfileButton, validationConfig);
});

validatorEditProfile.enableValidation()
validatorAddCard.enableValidation()

const initialCards = [{
		name: "Yosemite Valley",
		link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
	}, {
		name: "Lake Louise",
		link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
	}, {
		name: "Bald Mountains",
		link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
	}, {
		name: "Latemar",
		link: "https://code.s3.yandex.net/web-code/latemar.jpg"
	}, {
		name: "Vanoise National Park",
		link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
	}, {
		name: "Lago di Braies",
		link: "https://code.s3.yandex.net/web-code/lago.jpg"
	}

];

popupImageContainer.querySelector('#popoutImageCloseButton').addEventListener('click', () => closePopup(popupImageContainer));

	initialCards.forEach(item => {
		const card = new Card(item, "#card-template");
		const cardElement = card.generateCard();
		createCard(cardElement);
		return cardElement
	})

	function createCard(cardElement){
		cardsContainer.prepend(cardElement);
	}

newContentButton.addEventListener('click', function() {
	openPopup(newContentWindow);
	cardNameInput.value = '';
	imageInput.value = '';
});
closeContentWindowButton.addEventListener('click', function() {
	closePopup(newContentWindow);
});

function submitAddCardForm() {
	const inputObj = {name: cardNameInput.value,
	link: imageInput.value};
	const newObj = new Card(inputObj, "#card-template");
	const cardElement = newObj.generateCard();
	createCard(cardElement);
	closePopup(newContentWindow);
}

newContentWindow.addEventListener("submit", function(){
  submitAddCardForm()
  validatorAddCard._defaultButtonDisable(saveNewImage, validationConfig);
});