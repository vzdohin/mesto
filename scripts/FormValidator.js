export { FormValidator, configValidation };
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'input-error-style',
  inputInvalidClass: 'popup__input_validity_invalid'
}

class FormValidator {
  constructor(configValidation, formElement) {
    this.configValidation = configValidation;
    this.formElement = formElement;
    this.forms = Array.from(this.formElement.querySelectorAll(this.configValidation.formSelector));
    this.submitButton = this.formElement.querySelector(this.configValidation.submitButtonSelector);
    this.inputs = Array.from(this.formElement.querySelectorAll(this.configValidation.inputSelector));
  }
  _showInputError(input, errorText) {
    errorText.textContent = input.validationMessage;
    errorText.classList.add(this.configValidation.inputErrorClass);
  }

  _hideInputError(input, errorText) {
    // errorText.classList.remove(this.configValidation.inputErrorClass);
    errorText.textContent = '';
  }
  _checkInputValidation(input, errorText) {
    if (!input.validity.valid) {
      this._showInputError(input, errorText);
      input.classList.add(this.configValidation.inputInvalidClass)
    } else {
      this._hideInputError(input, errorText);
      input.classList.remove(this.configValidation.inputInvalidClass);
    }
  }
  _hasInvalidInput() {
    return Array.from(this.inputs).some((input) => !input.validity.valid);
  }
  _toggleButtonState() {
    if (!this._hasInvalidInput(this.inputs)) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }
  _disableButton() {
    this.submitButton.classList.add(this.configValidation.inactiveButtonClass);
    this.submitButton.disabled = true;
  }
  _enableButton() {
    this.submitButton.classList.remove(this.configValidation.inactiveButtonClass);
    this.submitButton.disabled = false;
  }
  _setEventListeners() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    
    this.inputs.forEach((input) => {
      const errorText = this.formElement.querySelector(`#${input.name}-error`);
      input.addEventListener('input', () => {
        this._checkInputValidation(input, errorText);
        this._toggleButtonState(this.inputs);
      });
    });
  };
  disableSubmitButton(){
    formElementAddCard.classList.add('.popup__save-button_disabled');
  }
  enableValidation() {
    this._setEventListeners();
        
  };
}

