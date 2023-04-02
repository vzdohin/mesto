
import {
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
  initialCards} from './utils/constants.js'
import Card from './Card.js'
import {Validator, configValidation} from './FormValidator.js'
import { openPopup, closePopup, closePopupEsc } from './utils/utils.js';

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

function addCard (evt) {
  const newCard = new Card(evt, '#card-template');
  cardsContainer.prepend(newCard.generateCard());
}
createCard(initialCards);

addCardButton.addEventListener('click', function (evt) {
  openPopup(addPopupCard);
  formElementAddCard.reset();
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
}

