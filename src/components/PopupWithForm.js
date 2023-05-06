import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }){
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._buttonElement = document.querySelector('.popup__save-button');

  }
  
  close(){
    this._popupForm.reset();
    super.close();
  }
  _getInputValues () {
    this._formList = {};
    this._inputList.forEach(input => { 
      this._formList[input.name] = input.value;
    });
    return this._formList;
  };

  setEventListeners () {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
    super.setEventListeners();
  }
 
  setButtonStatus(buttonText) {
    this._buttonElement.textContent = buttonText;
  }
}

// console.log(`Setting button status to ${status}`);
//     this.button.textContent = status;