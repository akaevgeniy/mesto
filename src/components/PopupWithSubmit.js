import { Popup } from './Popup.js';
export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitForm = submitFormFunction;
  }
  selectCard(id) {
    return id;
  }
  //переопределяем методы родительского класса
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}
