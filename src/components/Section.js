//Создаем класс Section, который отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
