export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  render() {
     this._renderItems.forEach((item) => {
      this._renderer(item);
     })
  }
  addItem(element) {
    this._container.prepend(element)
  } 
}