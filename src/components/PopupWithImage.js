//Создаем класс, который отвечает за работу с попапами с изображениями, наследуется от Popup
import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._caption = this._popup.querySelector('.popup__caption');
  }
  //переопределяем метод родительского класса
  open({ link, name }) {
    this._photo.src = link;
    this._photo.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
