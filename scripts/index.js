let editProfileButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
let editPopupCloseButton = document.querySelector('.popup__close-button');


editProfileButton.addEventListener('click', function () {
  openPopup(editPopup);
})

editPopupCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
}
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

let popupSaveButton = document.querySelector('.popup__save-button');

let userNameElement = document.querySelector('.profile__name');
let userNameInput = document.querySelector('.popup__input_data_name');
editProfileButton.addEventListener('click', function () {
  userNameInput.value = userNameElement.textContent;
})

let userAboutElement = document.querySelector('.profile__about');
let userAboutInput = document.querySelector('.popup__input_data_about');
editProfileButton.addEventListener('click', function () {
  userAboutInput.value = userAboutElement.textContent;
})

let formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userAboutElement.textContent = userAboutInput.value;
  editPopup.classList.remove('popup_opened')
}
formElement.addEventListener('submit', handleFormSubmit);

