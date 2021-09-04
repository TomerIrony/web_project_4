const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(rules.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__validation_show");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(rules.inputErrorClass);
  errorElement.classList.remove("form__validation_show-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(rules.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(rules.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(rules.inputSelector));
  const buttonElement = formElement.querySelector(rules.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


function enableValidation(){
  const formList = Array.from(document.querySelectorAll(rules.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
});
}

export const rules = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disable",
  inputErrorClass: "form__text_error",
  errorClass: "popup__error_visible"
}


enableValidation(rules); 

export const defaultButtonDisable = (popout, rules) => {
  const buttonElement = popout.querySelector(rules.submitButtonSelector);
  if (toggleButtonState) {
     buttonElement.classList.add(rules.inactiveButtonClass);
     buttonElement.disabled = true;
  }
}
