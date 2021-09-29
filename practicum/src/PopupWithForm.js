import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {formCallBack}){
    super(popupSelector);   // popupElement
    this._formCallBack = formCallBack;
    this._input = this._popupElement.querySelectorAll('.form__input');
    this._form = this._popupElement.querySelector('.form');
  }

  _getInputValues(){
    this._inputFieldsValue = {};
    this._input.forEach(item => {this._inputFieldsValue[item.name] = item.value})
    return this._inputFieldsValue;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', this._formCallBack)
  }

  close(){
    super.close();
    this._form.reset();
  }

  formCallBack = (evt) => {

  };
}
