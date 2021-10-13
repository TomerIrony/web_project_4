export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  open() {
    this._popup.classList.add("popout_opened");
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popout_opened");
    this.removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClose = () => {
    this.close();
  };

  _handleCloseOnBackground = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close(evt.currentTarget);
    }
  };

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup
      .querySelector(".popout__close-btn")
      .removeEventListener("click", this._handleClose);
    this._popup.removeEventListener("click", this._handleCloseOnBackground);
  }

  setEventListeners() {
    this._popup
      .querySelector(".popout__close-btn")
      .addEventListener("click", this._handleClose);
    this._popup.addEventListener("click", this._handleCloseOnBackground);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
