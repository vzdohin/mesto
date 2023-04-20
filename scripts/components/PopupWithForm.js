import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    
    this._popupForm = this._popupSelector.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    
  }
  
  close(){
    super.close();
  }
  _getImputValues(){
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formList = {};
    this._inputList.forEach(input => { 
      const value = input.value;
      const name = input.name;
      this._formList[name] = value;
    });
    
    return this._formList;
  };
  
  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      const imputValues = this._getImputValues
      this._handleFormSubmit = imputValues;
      this.close();
    })
  }
}