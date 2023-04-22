import './index.css'
import {
  cardsContainer,
  popups,
  formEditProfile,
  editProfileButton,
  userNameElement,
  userNameInput,
  userAboutElement,
  userAboutInput,
  buttonsClosePopup,
  formElementAddCard,
  cardNameInput,
  cardUrlInput,
  addCardButton,
  initialCards,
  configValidation
} from '../utils/constants'
import Card from '../components/Card'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js'


// validation
const cardFormValidate = new FormValidator(configValidation, formElementAddCard);
cardFormValidate.enableValidation();
const profileFormValidate = new FormValidator(configValidation, formEditProfile);
profileFormValidate.enableValidation();

// render card + pervie cards
const createCard = (item) => {
  const cardInstance = new Card(item, '#card-template', handleCardClick);
  return cardInstance.generateCard()
}

const cardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    cardList.addItem(createCard(item));
  } 
}, '.cards')
cardList.renderItems();

// всплывающее окно картинки на весь экр
function handleCardClick(src, alt) {
  popupImage.open(src, alt)
}

const popupImage = new PopupWithImage('.popup_zoom-image');
popupImage.setEventListeners();


// всплывающее окно профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__about'
});


// изменение инфы пользователя 
const handleSaveFormSubmit = (userData) => {
  {
      const newUserInfo = {
        name: userData.userNameInput,
        info: userData.userAboutInput
      };
      userInfo.setUserInfo(newUserInfo);
      popupUserInfo.close();
    }
}

const popupUserInfo = new PopupWithForm('.popup_profile-edit', {handleFormSubmit: handleSaveFormSubmit})
// добавление новой карточки 

const handleAddNewCard = (cardData) => {
  {
      const newCard = {
        name: cardData.cardNameInput,
        link: cardData.cardUrlInput
      };
      cardList.addItem(createCard(newCard));
      popupAddCard.close();
  }
}

const popupAddCard = new PopupWithForm('.popup_card-add',{ handleFormSubmit: handleAddNewCard})

popupAddCard.setEventListeners();
popupUserInfo.setEventListeners();

editProfileButton.addEventListener('click', function () {
  popupUserInfo.open();
  const infoObject = userInfo.getUserInfo()
  userNameInput.value = infoObject.name;
  userAboutInput.value = infoObject.info;
  // popupUserInfo.setInputValues(infoObject.name, infoObject.info);
})


addCardButton.addEventListener('click', function (evt) {
  popupAddCard.open();
})



