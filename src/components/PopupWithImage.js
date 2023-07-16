
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, popupImg, popupTitle) {
    super(selector);
    this._imageUrl = popupImg;
    this._title = popupTitle;
  }

  open(link, name) {
    this._imageUrl.src = link;
    this._title.textContent = name;
    this._imageUrl.alt = name;
    super.open();
  }
}

