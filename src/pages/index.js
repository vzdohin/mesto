import './index.css'
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
  initialCards,
  configValidation} from '../utils/constants'
import Card from '../components/Card'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js'
// import { openPopup, closePopup, closePopupEsc } from '../utils/utils.js';


// validation
const cardFormValidate = new FormValidator(configValidation, formElementAddCard);
cardFormValidate.enableValidation();
const profileFormValidate = new FormValidator(configValidation, formEditProfile);
profileFormValidate.enableValidation();

// render cards

  const renderCard = (item) => {
    const cardInstance = new Card(item, '#card-template');
    return cardInstance.generateCard()
  }


const cardList = new Section( {items: initialCards, renderer: renderCard }, '.cards__list')
cardList.renderItems();

// popup Image
function handleCardClick (src, alt)  {
  popupImage.open(src, alt)
}

const popupImage = new PopupWithImage('.popup_zoom-image');
popupImage.setEventListeners();


// popup User

const userProfileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__about'
});
// popup Forms
// popup User
const popupUserInfo = new PopupWithForm('.popup_profile-edit', {
  handleFormSubmit: (userData) => {
  const newUserInfo = {
    userName: userData.value,
    aboutInfo: userData.value
  };
  userProfileInfo.setUserInfo(newUserInfo);
  popupUserInfo.close();
}
// (data) => {
//   userProfileInfo.setUserInfo(data) 
}
)
// popup addCard
const popupAddCard = new PopupWithForm('.popup_card-add', {
  handleFormSubmit: (cardData) => {
  const newCard = {
    name: cardData.name,
    link: cardData.link
  };
  cardList.addItem(renderCard(newCard));
  popupAddCard.close();
  // cardList.addItem(renderCard(cardData))
}
})

popupAddCard.setEventListeners();
popupUserInfo.setEventListeners();

editProfileButton.addEventListener('click', function () {
  popupUserInfo.open();
  userNameInput.value = userNameElement.textContent;
  userAboutInput.value = userAboutElement.textContent;
})

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => popup.classList.remove('popup_opened'));
})

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  })
})

function submitEditProfileForm(evt) { 
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userAboutElement.textContent = userAboutInput.value;
  popupUserInfo.close();
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

const createCard = (item) => {
  const cardInstance = new Card(item, '#card-template', handleCardClick);
  return cardInstance.generateCard()
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
})

function addCard (evt) {
  const newCard = new Card(evt, '#card-template', handleCardClick);
  cardsContainer.prepend(newCard.generateCard());
}
createCard(initialCards);

addCardButton.addEventListener('click', function (evt) {
  popupAddCard.open();
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
  popupAddCard.close();
  evt.target.reset();
}


