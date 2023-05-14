export {
  formEditProfile,
  editProfileButton,
  userNameInput,
  userAboutInput,
  formElementAddCard,
  addCardButton,
  configValidation,
  authorization,
  formElementСhangeAvatarPopup,
  editAvatarButton
}
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'input-error-style',
  inputInvalidClass: 'popup__input_validity_invalid'
}

const authorization = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: 'ddc4e278-0407-4e45-bd07-0611ce12a4b8',
    "content-type": "application/json"}
}

const editPopupProfile = document.querySelector('.popup_profile-edit');
const formEditProfile = editPopupProfile.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const userNameInput = document.querySelector('.popup__input_data_name');
const userAboutInput = document.querySelector('.popup__input_data_about');

const addPopupCard = document.querySelector('.popup_card-add');
const formElementAddCard = addPopupCard.querySelector('.popup__form');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar')

const changeAvatarPopup = document.querySelector('.popup_change-avatar');
const formElementСhangeAvatarPopup = changeAvatarPopup.querySelector('.popup__form');

