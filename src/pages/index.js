import "../pages/index.css"; // add import of the main stylesheets file
import logo from "../images/logo.svg";
import penSrc from "../images/pen.svg";
import plusSignSrc from "../images/plussign.svg";

const logoImage = document.getElementById("logo");
logoImage.src = logo;

const pen = document.getElementById("pen");
pen.src = penSrc;
const profilePen = document.getElementById("profilePen");
profilePen.src = penSrc;

const plusSign = document.getElementById("plusSign");
plusSign.src = plusSignSrc;

import {
  validationConfig,
  FormValidation,
} from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import api from "../components/Api.js";
import load from "../components/load.js";
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
} from "../components/utils/constants.js";

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
      .then(load(editProfileWindow, true))
      .then(
        api.loadUserInfo().then((data) => {
          userInfo.setUserInfo(data.name, data.about, data.avatar);
        })
      );
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
