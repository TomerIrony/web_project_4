import { validationConfig, FormValidation } from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import {
  profileEditButton,
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
  editProfileWindow,
} from "./utils.js";

const imagePopup = new PopupWithImage(popupImageContainer);
const validatorEditProfile = new FormValidation(
  validationConfig,
  formEditProfile
);
const validatorAddCard = new FormValidation(validationConfig, newContentWindow);
const userInfo = new UserInfo(userFullName, userDescription);

profileEditButton.addEventListener("click", function () {
  //	Profile Edit Popup
  const userNameInfo = userInfo.getUserInfo().userName; //
  const userJobInfo = userInfo.getUserInfo().userJob; //
  inputName.value = userNameInfo; //
  inputDescription.value = userJobInfo; //
  editProfileForm.open(); //
}); //

const editProfileForm = new PopupWithForm( // Profile Edit Form
  editProfileWindow, //
  {
    formCallBack: (data) => {
      //
      userInfo.setUserInfo(
        //
        inputName.value,
        inputDescription.value
      ); //
      editProfileForm.close(); //
    }, //
  }
); //

const cardCreate = (data) => {
  // Card create data
  const cardCreated = new Card(data, cardTemplate, {
    //
    handleCardClick: (
      evt //
    ) => imagePopup.open(evt), //
  }); //
  return cardCreated; //
};

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

newContentButton.addEventListener("click", function () {
  // New Content Popup
  newCardPopup.open(); //
  cardNameInput.value = ""; //
  imageInput.value = ""; //
}); //

const newCardPopup = new PopupWithForm(newContentWindow, {
  // New Content Form
  //
  formCallBack: (data) => {
    //
    initalCardsList.addItem(
      cardCreate(data) //
        .generateCard()
    ); //
    newCardPopup.close(); //
  }, //
}); //

const initalCardsList = new Section(
  {
    items: initialCards, // inital cards push
    renderer: (data) => {
      //
      initalCardsList.addItem(cardCreate(data).generateCard()); //
    }, //
  }, //
  cardsContainer
); //																														//
initalCardsList.renderer(); //
