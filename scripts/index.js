
import {
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
  // cardClone,
  popupImage, image,
  caption,
  initialCards} from './constants.js'
import Card from './Card.js'
import {Validator, configValidation} from './FormValidator.js'

const cardFormValidate = new Validator(configValidation, formElementAddCard);
cardFormValidate.enableValidation();
const profileFormValidate = new Validator(configValidation, formEditProfile);
profileFormValidate.enableValidation();


editProfileButton.addEventListener('click', function () {
  openPopup(editPopupProfile);
  userNameInput.value = userNameElement.textContent;
  userAboutInput.value = userAboutElement.textContent;
})

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

 function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.addEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
})

function submitEditProfileForm(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userAboutElement.textContent = userAboutInput.value;
  closePopup(editPopupProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

const createCard = (item) => {
  const cardInstance = new Card(item, '#card-template');
  return cardInstance.generateCard()
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
})

function addCard (initialCards) {
  const newCard = new Card(initialCards, '#card-template');
  cardsContainer.prepend(newCard.generateCard());
}


addCardButton.addEventListener('click', function (evt) {
  openPopup(addPopupCard);
  const form = addPopupCard.querySelector('.popup__form')
  form.reset();
  
})

formElementAddCard.addEventListener('submit', handleFormSubmitCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
    
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  }
 
  addCard(newCard);
  
  closePopup(addPopupCard);
  evt.target.reset();
  formElementAddCard.classList.add('.popup__save-button_disabled');
  
}

export {openPopup, popupImage, image, caption}