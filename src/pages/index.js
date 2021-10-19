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
import Card from "../components/Card";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import api from "../components/Api.js";
import load from "../utils/load.js";
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
  likesAmmount,
} from "../utils/constants.js";

const imagePopup = new PopupWithImage(popupImageContainer);
const validatorEditProfile = new FormValidation(
  validationConfig,
  formEditProfile
);
const validatorAddCard = new FormValidation(validationConfig, newContentWindow);

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

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

api.promiseAll().then(([cardsArray, userApi]) => {
  const cardDeleteForm = new PopupWithForm({
    popup: deleteCardPopup,
  });
  const cardToInput = (data) => {
    const card = new Card(data, cardTemplate, userApi._id, {
      imagePopupClick: (data) => {
        imagePopup.open(data[0], data[1]);
      },
      cardLikeClick: (cardId, cardTemplate, cardLikesArray) => {
        card.likeHandle();
        if (card.checkIfLikes()) {
          api
            .likeCard(cardId)
            .then((number) => {
              card.likeCounter(number.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .removeLike(cardId)
            .then((number) => {
              card.likeCounter(number.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      cardDeleteCallBack: (cardId) => {
        cardDeleteForm.open();
        cardDeleteForm.handleDelete(() => {
          api
            .deleteCard(cardId)
            .then(() => {
              cardDeleteForm.close(), card.deleteCard();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    });

    return card;
  };
  const cardList = new Section(
    {
      items: cardsArray,
      renderer: (data) => {
        cardList.addItem(cardToInput(data).generateCard());
      },
    },
    cardsContainer
  );
  cardList.renderer();
  console.log(userApi.name);

  const editProfileForm = new PopupWithForm({
    popup: editProfileWindow,
    formCallBack: (data) => {
      load({ popup: editProfileWindow, loading: true });
      api
        .updateUserInfo(data["Full Name"], data.Description)
        .then(() => {
          const tempUserImage = userSettings.getUserInfo();
          userSettings.setUserInfo(
            data["Full Name"],
            data.Description,
            tempUserImage.userAvatar
          );
        })
        .then(() => {
          editProfileForm.close();
        })
        .finally(() => {
          load({ popup: editProfileWindow, loading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  profileEditButton.addEventListener("click", () => {
    const userNameAndJob = userSettings.getUserInfo();
    inputName.value = userNameAndJob.userName;
    inputDescription.value = userNameAndJob.userJob;
    editProfileForm.open();
  });
  const userSettings = new UserInfo(
    userFullName,
    userDescription,
    profileImage
  );

  userSettings.setUserInfo(userApi.name, userApi.about, userApi.avatar);

  const userEditImage = new PopupWithForm({
    popup: editImagePopup,
    formCallBack: (data) => {
      load({ popup: editImagePopup, loading: true });

      api
        .updateProfilePicture(data["Profile Image Url"])
        .then(() => {
          const newUserInfo = userSettings.getUserInfo();
          userSettings.setUserInfo(
            newUserInfo.userName,
            newUserInfo.userJob,
            data["Profile Image Url"]
          );
        })
        .then(() => {
          userEditImage.close();
        })
        .finally(load({ popup: editImagePopup, loading: false }))
        .catch((err) => {
          console.log(err);
        });
    },
  });

  document.querySelector(".profile__image").addEventListener("click", () => {
    userEditImage.open();
  });
  document
    .querySelector(".profile__image-pen")
    .addEventListener("click", () => {
      userEditImage.open();
    });

  const addNewCardForm = new PopupWithForm({
    popup: newContentWindow,
    formCallBack: (data) => {
      api
        .addNewCard(data)
        .then((res) => {
          cardList.prependItem(cardToInput(res).generateCard());
        })
        .then(() => {
          addNewCardForm.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  newContentButton.addEventListener("click", function () {
    validatorAddCard.resetValidation();
    addNewCardForm.open();
  });
});
