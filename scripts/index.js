let editProfileButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
let editPopupCloseButton = document.querySelector('.popup__close-button');

editProfileButton.addEventListener('click', function() {
  editPopup.classList.add('popup_opened');
})

editPopupCloseButton.addEventListener('click', function() {
  editPopup.classList.remove('popup_opened');
})

function openPopup(popup) {
  popup.classList.add('.popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('.popup_opened')
}

let userNameElement = document.querySelector('#userName');
let userNameInput = document.querySelector('#userNameInput');
userNameInput.value = userNameElement.textContent;

let userAboutElement = document.querySelector('#userAbout');
let userAboutInput = document.querySelector('#userAboutInput');
userAboutInput.value = userAboutElement.textContent;


let formElement = document.querySelector('.popup__form'); 

function handleFormSubmit (evt) {
    evt.preventDefault();     
    userNameElement.textContent = userNameInput.value;
    userAboutElement.textContent = userAboutInput.value;
}
formElement.addEventListener('submit', handleFormSubmit); 

let submitButton = document.querySelector('.popup__save-button');
submitButton.addEventListener('click', function() {
  editPopup.classList.remove('popup_opened');
})
