import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitForm = submitFormFunction;
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    console.log(this._inputValues);
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
