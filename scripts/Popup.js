//Создаем класс Popup, который отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
