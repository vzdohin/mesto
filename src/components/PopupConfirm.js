import Popup from "./Popup.js";
export default class PopupConfirm extends Popup {
  constructor(popupSelector, callBackApi){
    super(popupSelector);
    this._callBackApi = callBackApi;
    this._buttonDelete = document.querySelector('.card__button-delete')

  }
  open(){
    super.open();

  }
  close(){
    super.close();
  }
  setEventListeners(){
    // evt.preventDefault();
    super.setEventListeners();

  }
}