//Создаем класс, который отвечает за работу с попапами с изображениями, наследуется от Popup
import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }
  //переопределяем метод родительского класса
  open() {
    this._popup.querySelector('.popup__photo').src = this._link;
    this._popup.querySelector('.popup__caption').textContent = this._name;
    super.open();
  }
}
