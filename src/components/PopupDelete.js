import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(selector, api) {
    super(selector);
    this._formElement = this._container.querySelector('.popup__form');
    this._buttonElement = this._container.querySelector('.popup__button');
    this._api = api;
  }

  _deleteServerCard(cardId) {
    this._buttonElement.textContent = 'Удаление...';
    this._api
      .deleteCard(cardId)
      .then(() => {
        this.close();
        this._removeItem.remove();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this._buttonElement.textContent = 'Да';
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._deleteServerCard(this._cardId);
    });
  }

  open(removeItem, cardId) {
    super.open();
    this._removeItem = removeItem;
    this._cardId = cardId;
  }
}