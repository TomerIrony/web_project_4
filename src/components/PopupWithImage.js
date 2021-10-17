import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._src = this._popup.querySelector(".popout__image");
    this._title = this._popup.querySelector(".popout__caption");
  }
  open(title, image) {
    super.open();
    this._src.setAttribute("src", image);
    this._src.setAttribute("alt", title);
    this._title.textContent = title;
  }
}
