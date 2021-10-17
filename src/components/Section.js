export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = "";
  }

  /*   renderer(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  } */

  renderer() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  /* renderer(items) {
    for (let index = 0; index < items.length; index++) {
      this._renderer(item);
    }
  }
 */
  /* renderer() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
 */
  addItem(element) {
    this._container.append(element);
  }
  prependItem(element) {
    this._container.prepend(element);
  }
}
