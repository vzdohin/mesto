export default class Section {
  constructor({ renderer}, containerSelector){
    // this._items = items ;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems (items) {
    items.reverse().forEach((item) => {
      return this._renderer(item);
    })
  }

  addItem (itemHtml) {
    this._container.prepend(itemHtml)

  }
  
}

