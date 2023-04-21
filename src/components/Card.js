
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
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
  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleClickLikeButton()
    })
    this.deleteButton.addEventListener('click', () => {
      this._handleClickDeleteButton()
    })
    this._cardImage.addEventListener('click', () => {
      // console.log(this._handleCardClick)
      this._handleCardClick(this._link,this._name)});
    
  }
  generateCard() {
    this.element = this._getTemplate();
    this._cardImage = this.element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.element.querySelector('.card__title').textContent = this._name;
    this.likeButton = this.element.querySelector('.card__button-like');
    this.deleteButton = this.element.querySelector('.card__button-delete');
    this._setEventListeners();

    return this.element;
  }
}

