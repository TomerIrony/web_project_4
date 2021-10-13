import Popup from "./Popup.js";
import api from "./API.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formCallBack }) {
    super(popupSelector); // popupElement
    this._formCallBack = formCallBack;
    this._form = this._popup.querySelector(".form");
    this._input = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._inputFieldsValue = {};
    this._input.forEach((item) => {
      this._inputFieldsValue[item.name] = item.value;
    });
    return this._inputFieldsValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formCallBack);
  }

  close() {
    super.close();
    this._form.reset();
  }

  formCallBack = (evt) => {
    evt.preventDefault();
    const inputValues = this._formCallBack(this._getInputValues());
    return inputValues;
  };
}
