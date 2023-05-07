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
  configValidation,
  authorization,
  formElementСhangeAvatarPopup,
  editAvatarButton
} from '../utils/constants'
import Card from '../components/Card'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js'
import Api from '../components/Api';
import PopupDeleteConfirm from '../components/PopupDeleteConfirm';



// validation
const cardFormValidate = new FormValidator(configValidation, formElementAddCard);
cardFormValidate.enableValidation();
const profileFormValidate = new FormValidator(configValidation, formEditProfile);
profileFormValidate.enableValidation();
const avatarFormValidate = new FormValidator(configValidation, formElementСhangeAvatarPopup);
avatarFormValidate.enableValidation();

//создаем класс апи
const api = new Api(authorization)
let userId;

// генерация карточек
const createCard = (item) => {
  const cardInstance = new Card(item,
    userId,
    '#card-template',
    {
      handleCardClick: (src, alt) => {
        popupImage.open(src, alt)
      },
      handleDeleteClick: () => {
        popupDeleteConfirm.open(cardInstance)
      },
      handleLikeClick: () => {
        if (!cardInstance.checkIsLiked()) {
          api.likeCard(item._id)
            .then((item) => {
              cardInstance.addLike(item.likes)
            })
            .catch((err) => {
              console.log(`Error: ${err}`)
            });
        } else {
          api.removeLikeCard(item._id)
            .then((item) => {
              cardInstance.removeLike(item.likes)
            })
            .catch((err) => {
              console.log(`Error: ${err}`)
            });
        }
      }
    });
  return cardInstance.generateCard()
}
// попап подтверждения удаления 
const popupDeleteConfirm = new PopupDeleteConfirm('.popup_confirm-delete', (thisCard) => {
  api.deleteCard(thisCard._id)
    .then(() => {
      thisCard.removeCard();
      popupDeleteConfirm.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
})
popupDeleteConfirm.setEventListeners();

// попап картинки на весь экр

const popupImage = new PopupWithImage('.popup_zoom-image');
popupImage.setEventListeners();


// попап профиля

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
});


// сохр инфы пользователя, добавляем карточки с сервера
Promise.all([api.getAllCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    const cardList = new Section({
      items: cardsData,
      renderer: (item) => {
        cardList.addItem(createCard(item));
      }
    }, '.cards');
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// изменение инфы пользователя 
const handleSaveFormSubmit = (userData) => {
  {
    popupUserInfo.setButtonStatus("Сохранение...");
    const newUserInfo = {
      name: userData.userNameInput,
      about: userData.userAboutInput
    };
    
    api.addNewUserInfo(newUserInfo)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupUserInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupUserInfo.setButtonStatus("Сохранить");
      })
  }
}
const popupUserInfo = new PopupWithForm('.popup_profile-edit', { handleFormSubmit: handleSaveFormSubmit })

// добавление новой карточки 
const photos = new Section({
  renderer: (item) => {
    photos.addItem(item);
  }
}, '.cards')

const handleAddNewCard = (cardData) => {
  {
    popupAddCard.setButtonStatus("Сохранение...");
    const newCard = {
      name: cardData.cardNameInput,
      link: cardData.cardUrlInput
    };
    api.addNewCard(newCard.name, newCard.link)
      .then((res) => {
        const newCardElement = createCard(res);
        photos.addItem(newCardElement);
        popupAddCard.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        
        popupAddCard.setButtonStatus("Создать");
      })
  }
}
const popupAddCard = new PopupWithForm('.popup_card-add', { handleFormSubmit: handleAddNewCard })

// аватар
const handleChangeAvatar = (data) => {
  popupAvatar.setButtonStatus("Сохранение...");
  api.changeAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => popupAvatar.setButtonStatus("Сохранить")
    )
}
const popupAvatar = new PopupWithForm('.popup_change-avatar', { handleFormSubmit: handleChangeAvatar})

//слушатели попапов
popupAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupUserInfo.setEventListeners();

// слушатели кнопок
editProfileButton.addEventListener('click', function () {
  popupUserInfo.open();
  const infoObject = userInfo.getUserInfo()
  userNameInput.value = infoObject.name;
  userAboutInput.value = infoObject.info;
})
addCardButton.addEventListener('click', function (evt) {
  popupAddCard.open();
})
editAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
})