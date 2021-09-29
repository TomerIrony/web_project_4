import "./styles/index.css"; // add import of the main stylesheets file 
import logo from "./styles/images/logo.svg";
import profileImageSrc from "./styles/images/profileimage.jpg"
import penSrc from "./styles/images/pen.svg"
import plusSignSrc from "./styles/images/plussign.svg"

const logoImage = document.getElementById('logo');
logoImage.src = logo;

const profileimage = document.getElementById('profileImage');
profileimage.src = profileImageSrc;

const pen = document.getElementById('pen');
pen.src = penSrc;

const plusSign = document.getElementById('plusSign');
plusSign.src = plusSignSrc;

import {validationConfig, FormValidation} from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import {profileEditButton,
	userFullName,
	userDescription,
	formEditProfile,
	inputName,
	inputDescription,
	newContentButton,
	newContentWindow,
	cardsContainer,
	popupImageContainer,
	cardNameInput,
	initialCards,
	imageInput,
	cardTemplate,
	editProfileWindow
} from "./utils.js"

const imageClickedPopup = new PopupWithImage(popupImageContainer);
const validatorEditProfile = new FormValidation(validationConfig ,formEditProfile)
const validatorAddCard = new FormValidation(validationConfig ,newContentWindow)
const inputUserInfo = new UserInfo(userFullName, userDescription)


const profileEditPopup = new Popup(editProfileWindow);			// Profile Edit Popup
profileEditButton.addEventListener('click', function(){			//
	const userNameInfo = inputUserInfo.getUserInfo().userName	//
	const userJobInfo = inputUserInfo.getUserInfo().userJob		//																			
	inputName.value = userNameInfo;														//
	inputDescription.value = userJobInfo;											//															
	profileEditPopup.open()																		//
	editProfileForm.open()																		//
})																													//


const editProfileForm = new PopupWithForm										// Profile Edit Form
(editProfileWindow,																					//
	{formCallBack: () => {																		//
		inputUserInfo.setUserInfo																//
		(inputName.value, inputDescription.value)								//
		editProfileForm.close()																	//
	}																													//
})																													//

const cardCreate = (data) => {															// Card create data
	const cardCreated = new Card(data, cardTemplate, {				//
		handleCardClick: (evt) =>																//
		imageClickedPopup.open(evt)															//
	})																												//
	return cardCreated;																				//
}

validatorEditProfile.enableValidation()
validatorAddCard.enableValidation()

const newContentPopup = new Popup(newContentWindow)  				// New Content Popup
newContentButton.addEventListener('click', function() {			//
	newContentPopup.open();																		//
	newContentForm.open();																		//											
	cardNameInput.value = '';																	//
	imageInput.value = '';																		//
});																													//

const newContentForm = new PopupWithForm										// New Content Form
(newContentWindow, {																				//
	formCallBack: (data) => {																	//
		initalCardsList.addItem(cardCreate(data)								//
		.generateCard())																				//
		newContentForm.close()																	//
	}																													//
});																													//

const initalCardsList = new Section({items: initialCards,    // inital cards push
	renderer:(data) =>{																				 //
		initalCardsList.addItem(cardCreate(data).generateCard()) //
	},																												 //
},																												   //
cardsContainer)																						 	 //																														//
initalCardsList.renderer();																 	 //


