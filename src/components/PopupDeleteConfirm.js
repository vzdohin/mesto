import Popup from "./Popup.js";
export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
  }
  open(card){
    super.open();
    this._card = card;
  }
  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    })
  }
  
}