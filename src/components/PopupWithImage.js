//Создаем класс, который отвечает за работу с попапами с изображениями, наследуется от Popup
import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._alt = name;
    this._photo = this._popup.querySelector('.popup__photo');
    this._caption = this._popup.querySelector('.popup__caption');
  }
  //переопределяем метод родительского класса
  open() {
    this._photo.src = this._link;
    this._photo.alt = this._alt;
    this._caption.textContent = this._name;
    super.open();
  }
}
