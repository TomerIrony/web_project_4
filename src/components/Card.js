export default class Card {
  constructor(
    data,
    template,
    userId,
    { imagePopupClick, cardLikeClick, cardDeleteCallBack }
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this._template = template;
    this._imagePopupClick = imagePopupClick;
    this._cardLikeClick = cardLikeClick;
    this._cardDeleteCallBack = cardDeleteCallBack;
  }

  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _deleteButtons() {
    if (this._userId !== this._owner) {
      this._element.querySelector(".card__close").style.display = "none";
    }
  }

  likeCard() {
    this._element
      .querySelector(".card__like-btn")
      //
      .classList.add("card__like-active");
  }

  removelike() {
    this._element
      .querySelector(".card__like-btn")
      .classList.remove("card__like-active");
  }

  _saveLike() {
    if (this._likes.filter((e) => e._id === this._userId).length > 0) {
      this._element
        .querySelector(".card__like-btn")
        .classList.add("card__like-active");
    }
  }

  likeCounter() {
    this._element.querySelector(".card__like-numbers").textContent =
      this._likes.length;
  }

  likeHandle() {
    if (
      !this._element
        .querySelector(".card__like-btn")
        .classList.contains("card__like-active")
    ) {
      this.likeCard();
    } else {
      this.removelike();
    }
  }

  checkIfLikes() {
    return this._element
      .querySelector(".card__like-btn")
      .classList.contains("card__like-active");
  }

  deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._image;
    this._element.querySelector(".card__name").textContent = this._title;
    this._deleteButtons();
    //

    this._saveLike();
    this._element
      .querySelector(".card__close")
      .addEventListener("click", () => {
        this._cardDeleteCallBack(this._id);
      });
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => {
        this._cardLikeClick(
          this._id,
          this._element,
          this._likes,
          this._likeButton
        );
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._imagePopupClick([this._title, this._image]);
      });
    this.likeCounter();

    return this._element;
  }
}
