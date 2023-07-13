import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._formElement = this._container.querySelector('.popup__form');
    this._submitButton = this._formElement.querySelector('.popup__button');
  }

  _getInputValues() {
    const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
    })
  }
}
