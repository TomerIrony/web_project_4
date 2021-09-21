export class FormValidation{
  constructor(rules, formElement){
    this._rules = rules;
    this._formElement = formElement;
  }
  
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(rules.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(rules.formValidationShow);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(rules.inputErrorClass);
    errorElement.classList.remove(rules.formValidationActive);
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _defaultButtonDisable = (buttonElement, rules) => {
    buttonElement.classList.add(rules.inactiveButtonClass);
    buttonElement.disabled = true
  };

  _defaultButtonEnable = (buttonElement, rules) => {
    buttonElement.classList.remove(rules.inactiveButtonClass); 
    buttonElement.disabled = false; 
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._defaultButtonDisable(buttonElement, rules);
    } else {
      this._defaultButtonEnable(buttonElement, rules);
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(rules.inputSelector));
    const buttonElement = formElement.querySelector(rules.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation(){
    const formList = Array.from(document.querySelectorAll(rules.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  
      this._setEventListeners(formElement);
  });
  };
}



export const rules = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disable",
  inputErrorClass: "form__text_error",
  errorClass: "popup__error_visible",
  formValidationShow: "form__validation_show",
  formValidationActive: "form__validation_show"
};




