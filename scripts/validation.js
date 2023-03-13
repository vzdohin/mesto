const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'input-error-style',
  inputInvalidClass: 'popup__input_validity_invalid'
}

const showInputError = (errorText, validationMessage, inputErrorClass) => {
  errorText.textContent = validationMessage;
  errorText.classList.add(inputErrorClass);
}

const hideInputError = (errorText, inputErrorClass) => {
  errorText.classList.remove(inputErrorClass);
  errorText.textContent = '';
}

const disableButton = (submitButton, inactiveButtonClass) => {
  
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}
const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

const checkInputValidation = (input, inputErrorClass, inputInvalidClass) => { 
  const inputName = input.getAttribute('name');
  const errorText = document.getElementById(`${inputName}-error`);
  if (!input.validity.valid){
    showInputError(errorText, input.validationMessage, inputErrorClass);
    input.classList.add(inputInvalidClass)
  } else {
    hideInputError(errorText);
    input.classList.remove(inputInvalidClass);
  }

}

const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, inactiveButtonClass, inputs) => {
  if (!hasInvalidInput(inputs)) {
    enableButton(submitButton, inactiveButtonClass);
  } else { 
    disableButton(submitButton, inactiveButtonClass);
  }
}

const setEventListeners = (form, inputs, inputErrorClass, submitButton, inactiveButtonClass, inputInvalidClass) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  inputs.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidation(input, inputErrorClass, inputInvalidClass);
      toggleButtonState(submitButton, inactiveButtonClass, inputs);
    });
  });
};

const enableValidation = (configValidation) => {
  const forms = Array.from(document.querySelectorAll(configValidation.formSelector));
    forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
    const inputs = Array.from(form.querySelectorAll(configValidation.inputSelector));
    const submitButton = form.querySelector(configValidation.submitButtonSelector);
    setEventListeners(form, inputs, configValidation.inputErrorClass, submitButton, 
      configValidation.inactiveButtonClass, configValidation.inputInvalidClass);
});
};

enableValidation(configValidation);