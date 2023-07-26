import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(selector, api) {
    super(selector);
    this._formElement = this._container.querySelector('.popup__form');
    this._buttonElement = this._container.querySelector('.popup__button');
    this._api = api;
    // сохраняем ссылку на обработчик события, чтобы можно было его удалить при закрытии попапа
    this._submitHandler = (event) => {
      event.preventDefault();
      this._deleteServerCard(this._cardId); // Используем сохраненный идентификатор карточки
    };
  }

  _deleteServerCard(cardId) {
    this._buttonElement.textContent = 'Удаление...';
    this._api.deleteCard(cardId)
    .catch((error) => {
      console.error(error);
    })
      .finally(() => {
        this.close();
        this._removeItem.remove();
        this._buttonElement.textContent = 'Да';
      });
  }

  setEventListeners(removeItem, cardId) {
    super.setEventListeners();
    this._removeItem = removeItem;
    this._cardId = cardId;
    this._formElement.addEventListener('submit', this._submitHandler);
  }
}