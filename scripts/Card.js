import {popupCardOpen, popupImg, popupTitle, openPopup} from '../scripts/index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._cardTitle = this._cardElement.querySelector('.cards__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._buttonDelete = this._cardElement.querySelector('.cards__remove-btn');
    this._buttonLike = this._cardElement.querySelector('.cards__btn')
    this._setEventListeners();
    return this._cardElement;
  }

  _handleCardDelete() {
    this._cardElement.remove();
  }

  _handleCardLike() {
    this._buttonLike.classList.toggle('cards__btn_active');
  }

  _handleCardOpen() {
    popupImg.src = this._cardImage.src;
    popupTitle.textContent = this._cardTitle.textContent;
    openPopup(popupCardOpen);
  }


  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    })
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardOpen();
    })
  }
}
