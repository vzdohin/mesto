import { openPopup, popupImage, image, caption } from "./index.js";


export default class Card {
  constructor(initialCards, templateSelector) {
    this.name = initialCards.name;
    this.link = initialCards.link;
    this.templateSelector = templateSelector;

  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  _handleClickLikeButton() {
    this.likeButton.classList.toggle('card__button-like_active');
  }
  _handleClickDeleteButton() {
    this.element.remove();
  }
  _handleClickImageButton() {
    openPopup(popupImage);
    image.src = this.link
    image.alt = this.name;
    caption.textContent = this.name;
  }
  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleClickLikeButton()
    })
    this.deleteButton.addEventListener('click', () => {
      this._handleClickDeleteButton()
    })
    this.cardPicture.addEventListener('click', () => {
      this._handleClickImageButton()
    })
  }
  generateCard() {
    this.element = this._getTemplate();
    this.cardPicture = this.element.querySelector('.card__image');
    this.cardPicture.src = this.link;
    this.cardPicture.alt = this.name;
    this.element.querySelector('.card__title').textContent = this.name;
    this.likeButton = this.element.querySelector('.card__button-like');
    this.deleteButton = this.element.querySelector('.card__button-delete');
    this._setEventListeners();

    return this.element;
  }
}

