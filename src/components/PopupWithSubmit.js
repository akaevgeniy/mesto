import { Popup } from './Popup.js';
export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitForm = submitFormFunction;
  }
  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }
  setCard() {
    return this._card;
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
