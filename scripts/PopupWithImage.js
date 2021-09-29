import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._src = this._popupElement.querySelector('.popout__image')
    this._title = this._popupElement.querySelector('.popout__caption')
  }
  open(evt){
    super.open()
    const srcImage = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const titleImage = evt.target.parentElement.querySelector('.card__name').textContent;
    this._src.setAttribute('src', srcImage);
    this._title.textContent = titleImage;
  }
}