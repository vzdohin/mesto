const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'input-error-style',
  inputInvalidClass: 'popup__input_validity_invalid'
}

class Validator {
  constructor(configValidation, formElement) {
    this.configValidation = configValidation;
    this.formElement = formElement;
    this.forms = Array.from(this.formElement.querySelectorAll(this.configValidation.formSelector));
    this.submitButton = this.formElement.querySelector(this.configValidation.submitButtonSelector);
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
  _hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
  }
  _toggleButtonState(inputs) {
    if (!this._hasInvalidInput(inputs)) {
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
    const inputs = Array.from(this.formElement.querySelectorAll(this.configValidation.inputSelector));
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    
    inputs.forEach((input) => {
      const errorText = this.formElement.querySelector(`#${input.name}-error`);
      input.addEventListener('input', () => {
        this._checkInputValidation(input, errorText);
        this._toggleButtonState(inputs);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
        
  };
}
export { Validator, configValidation };
