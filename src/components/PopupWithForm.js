import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popup, formCallBack }) {
    super(popup); // popupElement
    this._formCallBack = formCallBack;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._inputFieldsValue = {};
    this._inputs.forEach((item) => {
      this._inputFieldsValue[item.name] = item.value;
    });
    return this._inputFieldsValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.formCallBack);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this.formCallBack);
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

  handleDelete(handle) {
    this._formCallBack = handle;
  }
}
