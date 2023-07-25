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
    this._api.deleteCard(cardId)
    .finally(() => {
      this._buttonElement.textContent = 'Да';
    });
  }
  
  setEventListeners(removeItem, cardId) {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._deleteServerCard(cardId)
      this.close()
      removeItem.remove();
    })
  }
}