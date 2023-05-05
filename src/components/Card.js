
export default class Card {
  constructor(data, userId, templateSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes || [];
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = null;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this)
    })
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick()
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link,this._name)});
    
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.card__button-like');
    this._deleteButton = this._element.querySelector('.card__button-delete');
    if (this._userId !== this._owner._id){
      this._deleteButton.style.display = 'none';
    }
    this._likeCounter = this._element.querySelector('.card__button-like-counter')
    if (this.checkIsLiked()){
      this._likeButton.classList.add('card__button-like_active')
    } else {
      this._likeButton.classList.remove('card__button-like_active')
    }

    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  checkIsLiked() { 
    if (this._likes) { 
        return this._likes.find((like) => {
            return (like._id === this._userId);
        });
    }
    return false;
}

_setLikeCounter(likes) {
    if (Array.isArray(likes)) { 
        this._likes = likes;
        this._likeCounter.textContent = this._likes.length;
    }
}
  addLike(likesList){
    this._likeButton.classList.add('card__button-like_active');
    this._likeCounter.textContent = likesList.length;
    this._likes = likesList
  }
  removeLike(likesList){
    this._likeButton.classList.remove('card__button-like_active');
    this._likeCounter.textContent = likesList.length;
    this._likes = likesList
  }
  removeCard(){
    this._element.remove();
    this._element = null
  }
}

