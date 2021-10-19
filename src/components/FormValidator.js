export class FormValidation {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.formValidationShow);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.formValidationActive);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _defaultButtonDisable = (buttonElement) => {
    buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _defaultButtonEnable = (buttonElement) => {
    buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._defaultButtonDisable(buttonElement);
    } else {
      this._defaultButtonEnable(buttonElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  resetValidation() {
    const { inactiveButtonClass } = this._validationConfig;
    if (this._button) {
      this._button.classList.add(inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disable",
  inputErrorClass: "form__text_error",
  errorClass: "popup__error_visible",
  formValidationShow: "form__validation_show",
  formValidationActive: "form__validation_show",
};
