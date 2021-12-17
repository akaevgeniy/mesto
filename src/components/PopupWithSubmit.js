import { Popup } from './Popup.js';
export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormFunction, id) {
    super(popupSelector);
    this._submitForm = submitFormFunction;
    this._id = id;
  }
  //переопределяем методы родительского класса
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._id);
      this.close();
    });
  }
}
