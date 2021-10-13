import { validationConfig, FormValidation } from "./FormValidator.js";
import Card from "./Card.js";
import api from "./Api.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import load from "./load.js";
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
  imageInput,
  cardTemplate,
  editProfileWindow,
  profileImage,
  editImagePopup,
  imageUrlInput,
  deleteCardPopup,
} from "./utils.js";

const imagePopup = new PopupWithImage(popupImageContainer);
const validatorEditProfile = new FormValidation(
  validationConfig,
  formEditProfile
);
const validatorAddCard = new FormValidation(validationConfig, newContentWindow);
const userInfo = new UserInfo(userFullName, userDescription, profileImage);

api.loadUserInfo().then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar);
});

profileEditButton.addEventListener("click", function () {
  //	Profile Edit Popup
  const userNameInfo = userInfo.getUserInfo().userName;
  const userJobInfo = userInfo.getUserInfo().userJob;
  inputName.value = userNameInfo;
  inputDescription.value = userJobInfo;
  editProfileWindow.querySelector(".form__submit-btn").textContent = "Save";
  editProfileForm.open();
});

const editProfileForm = new PopupWithForm({
  popupSelector: editProfileWindow,
  formCallBack: (data) => {
    api.updateUserInfo();
    api
      .loadUserInfo()
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
      })
      .then(load(editProfileWindow, true));
    editProfileForm.close();
  },
});

profileImage.addEventListener("click", function () {
  editImageForm.open();
});
profileImage.addEventListener("mouseover", () => {
  document.querySelector(".profile__image-pen").style.visibility = "visible";
});
profileImage.addEventListener("mouseout", () => {
  document.querySelector(".profile__image-pen").style.visibility = "hidden";
});
document
  .querySelector(".profile__image-pen")
  .addEventListener("mouseover", () => {
    document.querySelector(".profile__image-pen").style.visibility = "visible";
  });
document.querySelector(".profile__image-pen").addEventListener("click", () => {
  editImagePopup.querySelector(".form__submit-btn").textContent = "Save";
  editImageForm.open();
});

const editImageForm = new PopupWithForm({
  popupSelector: editImagePopup,
  formCallBack: () => {
    profileImage.setAttribute("src", imageUrlInput.value);
    api
      .updateProfilePicture(imageUrlInput.value)
      .then(load(editImagePopup, true))
      .then(editImageForm.close());
  },
});

const cardCreate = (data) => {
  const cardCreated = new Card(data, cardTemplate, {
    handleCardClick: (evt) => imagePopup.open(evt),
  });
  return cardCreated;
};

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

newContentButton.addEventListener("click", function () {
  // New Content Popup
  newCardPopup.open();
  cardNameInput.value = "";
  imageInput.value = "";
});

const newCardPopup = new PopupWithForm({
  popupSelector: newContentWindow,
  formCallBack: () => {
    api
      .addNewCard(cardNameInput.value, imageInput.value)
      .then(createCards)
      .then(newCardPopup.close());
  },
});

function createCards() {
  api.getInitialCards().then((data) => {
    const initalCardsList = new Section(
      {
        items: data,
        renderer: (data) => {
          initalCardsList.addItem(cardCreate(data).generateCard());
        },
      },
      cardsContainer
    );
    initalCardsList.renderer();
  });
}
createCards();
