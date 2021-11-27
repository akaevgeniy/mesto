//Создаем класс Popup, который отвечает за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  //метод для открытия попапа
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this.setEventListeners();
  }
  //метод для закрытия попапа
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  //метод с логикой закрытия попапа по нажатию на Еск
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //метод, вешающий слушатели событий формы
  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
