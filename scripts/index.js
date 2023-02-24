let editPopupProfile = document.querySelector('.popup_profile-edit');
let editProfileButton = document.querySelector('.profile__edit-button');
let editPopupCloseButton = document.querySelector('.popup__close-button');

let userNameElement = document.querySelector('.profile__name');
let userNameInput = document.querySelector('.popup__input_data_name');
let userAboutElement = document.querySelector('.profile__about');
let userAboutInput = document.querySelector('.popup__input_data_about');

editProfileButton.addEventListener('click', function () {
  openPopup(editPopupProfile);
  userNameInput.value = userNameElement.textContent;
  userAboutInput.value = userAboutElement.textContent;
})

editPopupCloseButton.addEventListener('click', function () {
  closePopup(editPopupProfile);
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
}
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

let formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userAboutElement.textContent = userAboutInput.value;
  closePopup(editPopupProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

// конец 4 пр

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

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.cards');


function addCard(card) {
  const cardClone = document.querySelector('#card-template').content.cloneNode(true);
  const cardTitle = cardClone.querySelector('.card__title');
  cardTitle.textContent = card.name;
  const cardImage = cardClone.querySelector('.card__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Изображние, название которого ${card.name}`);

  const deletButton = cardClone.querySelector('.card__button-delete');
  deletButton.addEventListener('click', handleClickDeleteButton);
  const likeButton = cardClone.querySelector('.card__button-like');
  likeButton.addEventListener('click', handleClickLikeButton);
  cardImage.addEventListener('click', handleClickImageButton);
  
  cardsContainer.prepend(cardClone);
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
  const popupImage = document.querySelector('.popup_zoom-image');
  const image = popupImage.querySelector('.popup__zoom-image');
  openPopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  const card = evt.target.closest('.card');
  const title = card.querySelector('.card__title');
  const caption = popupImage.querySelector('.popup__caption');
  caption.textContent = title.textContent;
  closeButton = popupImage.querySelector('.popup__close-button')
  closeButton.addEventListener('click', function () {
    closePopup(popupImage);
  })
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]);
}

const addPopupCard = document.querySelector('.popup_card-add');
const addCardButton = document.querySelector('.profile__add-button');
const addPopupCardCloseButton = addPopupCard.querySelector('.popup__close-button');
addCardButton.addEventListener('click', function () {
  openPopup(addPopupCard);

})
addPopupCardCloseButton.addEventListener('click', function () {
  closePopup(addPopupCard);
})

const formElementAddCard = addPopupCard.querySelector('.popup__form');


formElementAddCard.addEventListener('submit', handleFormSubmitCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const form = evt.target;
  const cardNameInput = formElementAddCard.querySelector('.popup__input_card_name').value;
  const cardUrlInput = formElementAddCard.querySelector('.popup__input_card_url').value;
  const newCard = {
    name: cardNameInput,
    link: cardUrlInput
  }
  addCard(newCard);
  closePopup(addPopupCard);
  evt.target.reset();
}


