const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.cards');
const editPopupProfile = document.querySelector('.popup_profile-edit');
const formElement = editPopupProfile.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const userNameElement = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.popup__input_data_name');
const userAboutElement = document.querySelector('.profile__about');
const userAboutInput = document.querySelector('.popup__input_data_about');

const closeButton = document.querySelectorAll('.popup__close-button');

const addPopupCard = document.querySelector('.popup_card-add');
const formElementAddCard = addPopupCard.querySelector('.popup__form');
const cardNameInput = formElementAddCard.querySelector('.popup__input_card_name');
const cardUrlInput = formElementAddCard.querySelector('.popup__input_card_url');
const addCardButton = document.querySelector('.profile__add-button');

const cardClone = document.querySelector('#card-template').content;

const popupImage = document.querySelector('.popup_zoom-image');
const image = popupImage.querySelector('.popup__zoom-image');
const caption = popupImage.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Республика Коми',
    link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Красноярск',
    link: 'https://images.unsplash.com/photo-1587451152235-05466c2fc532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Оренбург',
    link: 'https://images.unsplash.com/photo-1651479801250-feac885982fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
];

editProfileButton.addEventListener('click', function () {
  openPopup(editPopupProfile);
  userNameInput.value = userNameElement.textContent;
  userAboutInput.value = userAboutElement.textContent;
})


  closeButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  })

function openPopup(popup) {
  popup.classList.add('popup_opened')
}
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userAboutElement.textContent = userAboutInput.value;
  closePopup(editPopupProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

function creatCard(card) {
  const cardCloneElement = cardClone.querySelector('.card').cloneNode(true);
  const cardTitle = cardCloneElement.querySelector('.card__title');
  cardTitle.textContent = card.name;
  const cardImage = cardCloneElement.querySelector('.card__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Изображние, название которого ${card.name}`);

  const deletButton = cardCloneElement.querySelector('.card__button-delete');
  deletButton.addEventListener('click', handleClickDeleteButton);
  const likeButton = cardCloneElement.querySelector('.card__button-like');
  likeButton.addEventListener('click', handleClickLikeButton);
  cardImage.addEventListener('click', handleClickImageButton);
  return (cardCloneElement);
}

const addCard = (card) => {
  const cardElement = creatCard(card);
  cardsContainer.prepend(cardElement);
}

function handleClickDeleteButton(evt) {
  const button = evt.target;
  const deleteCard = button.closest('.card');
  deleteCard.remove()
}

function handleClickLikeButton(evt) {
  const button = evt.target;
  button.classList.toggle('card__button-like_active');
  
}

function handleClickImageButton(evt){
  openPopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  const card = evt.target.closest('.card');
  const title = card.querySelector('.card__title');
  caption.textContent = title.textContent;
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]);
}

addCardButton.addEventListener('click', function () {
  openPopup(addPopupCard);

})

formElementAddCard.addEventListener('submit', handleFormSubmitCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const form = evt.target;
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  }
  addCard(newCard);
  closePopup(addPopupCard);
  evt.target.reset();
}
