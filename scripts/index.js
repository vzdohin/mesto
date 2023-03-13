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
  popup.classList.add('popup_opened')
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

function handleClickImageButton(evt) {
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
  disableButton(buttonSubmitProfile, configValidation.inactiveButtonClass);
  evt.target.reset();
}
