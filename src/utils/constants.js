export {
  // content,
  cardsContainer,
  popups,
  editPopupProfile,
  formEditProfile,
  editProfileButton,
  userNameElement,
  userNameInput,
  userAboutElement,
  userAboutInput,
  buttonsClosePopup, 
  addPopupCard,
  formElementAddCard,
  cardNameInput,
  cardUrlInput,
  addCardButton, 
  cardClone,
  popupImage, 
  image,
  caption,
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

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.cards');
const popups = document.querySelectorAll('.popup');
const editPopupProfile = document.querySelector('.popup_profile-edit');
const formEditProfile = editPopupProfile.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const userNameElement = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.popup__input_data_name');
const userAboutElement = document.querySelector('.profile__about');
const userAboutInput = document.querySelector('.popup__input_data_about');

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

const addPopupCard = document.querySelector('.popup_card-add');
const formElementAddCard = addPopupCard.querySelector('.popup__form');
const cardNameInput = formElementAddCard.querySelector('.popup__input_card_name');
const cardUrlInput = formElementAddCard.querySelector('.popup__input_card_url');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar')

const changeAvatarPopup = document.querySelector('.popup_change-avatar');
const formElementСhangeAvatarPopup = changeAvatarPopup.querySelector('.popup__form');

const cardClone = document.querySelector('#card-template');

const popupImage = document.querySelector('.popup_zoom-image');
const image = popupImage.querySelector('.popup__zoom-image');
const caption = popupImage.querySelector('.popup__caption');

// const initialCards = [
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Республика Коми',
//     link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
//   },
//   {
//     name: 'Красноярск',
//     link: 'https://images.unsplash.com/photo-1587451152235-05466c2fc532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   },
//   {
//     name: 'Оренбург',
//     link: 'https://images.unsplash.com/photo-1651479801250-feac885982fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
//   }
// ];

