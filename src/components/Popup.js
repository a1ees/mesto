
export default class Popup {
  constructor(selector) {
    this._container = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._closeButtons = this._container.querySelector('.popup__close-button');
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._container.classList.add('popup_opened');
    this._container.addEventListener('click', this._handleOverlayClick);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._container.classList.remove('popup_opened');
    this._container.removeEventListener('click', this._handleOverlayClick);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
  
  setEventListeners() {
    this._closeButtons.addEventListener('click', (event) => {
      event.stopPropagation();
      this.close()
    })
  }
}
