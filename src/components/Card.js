import api from "./Api.js";
import PopupWithForm from "./PopupWithForm.js";

export default class Card {
  constructor(data, template, { handleCardClick }) {
    this._handleCardClick = handleCardClick;
    this._title = data.name;
    this._image = data.link;
    this._owner = data.owner._id;
    this._template = template;
    this._cardId = data._id;
    this._cardLike = data.likes;
  }
  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike = () => {
    this._element
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-active");
    if (
      this._element
        .querySelector(".card__like-btn")
        .classList.contains("card__like-active")
    ) {
      api.likeCard(this._cardId);
      let likeCount = this._element.querySelector(
        ".card__like-numbers"
      ).textContent;
      this._element.querySelector(".card__like-numbers").textContent =
        parseInt(likeCount) + 1;
    } else {
      api.removeLike(this._cardId);
      let likeCount = this._element.querySelector(
        ".card__like-numbers"
      ).textContent;
      this._element.querySelector(".card__like-numbers").textContent =
        parseInt(likeCount) - 1;
    }
  };

  _likesAmount() {
    this._element.querySelector(".card__like-numbers").textContent =
      this._cardLike.length;
  }

  _random = () => {
    console.log(this._cardLike.length);
  };

  _saveLike() {
    if (
      this._cardLike.filter((e) => e._id === "7dacff0ba96f510d19a18e7c")
        .length > 0
    ) {
      this._element
        .querySelector(".card__like-btn")
        .classList.add("card__like-active");
    }
  }

  likeButtons() {
    const button = this._element.querySelector(".card__like-btn");
  }

  _deleteButton() {
    if (this._owner !== "7dacff0ba96f510d19a18e7c") {
      this._element.querySelector(".card__close").style.display = "none";
    }
  }

  _deleteCard = () => {
    const deleteCardConfirm = new PopupWithForm({
      popupSelector: document.getElementById("deleteImagePopup"),
      formCallBack: () => {
        api
          .deleteCard(this._cardId)
          .then(deleteCardConfirm.close())
          .then(this._element.remove());
      },
    });
    deleteCardConfirm.open();
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__name").textContent = this._title;
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", this._toggleLike);
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => {
        console.log(this._cardLike.length);
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);
    this._deleteButton();
    this._saveLike();
    this._element
      .querySelector(".card__close")
      .addEventListener("click", this._deleteCard);
    this._likesAmount();
    this._element
      .querySelector(".card__name")
      .addEventListener("click", this._random);
    return this._element;
  }
}
