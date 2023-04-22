import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }){
    super(popupSelector);
    
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    
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
  // setInputValues(data) {
  //   this._inputList.forEach((input)=>{
  //     input.value = data[input.name]
  //   })
  // }
  
  setEventListeners () {
    
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}