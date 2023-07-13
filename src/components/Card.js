import { popupWithImage } from '../pages/index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = popupWithImage;
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


  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    })
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick.open(this._link, this._name);
    })
  }
}
