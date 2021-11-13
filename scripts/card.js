//импортируем функцию открытия попапа и константу попапа с рисунком
import { openPopup, imageForm } from './utils.js';
// Класс, создающий карточку
export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  //Приватный метод, возвращающий новый узел с данными
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  //Публичный метод, возвращающий узел с заполненными данными (элемент карточки) и активирующий события
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const sectionElementTitle = this._element.querySelector('.element__title');
    const sectionElementPhoto = this._element.querySelector('.element__photo');

    sectionElementPhoto.src = this._link;
    sectionElementPhoto.alt = this._name;
    sectionElementTitle.textContent = this._name;

    return this._element;
  }
  // Приватный метод для установки лайка
  _setLikeButton() {
    const elementLikeButton = this._element.querySelector('.element__like');
    // Вешаем функцию на событие нажатия по кнопке лайка
    elementLikeButton.addEventListener('click', () => {
      elementLikeButton.classList.toggle('element__like_active');
    });
  }
  // Приватный метод для удаления элемента
  _setDeleteElementButton() {
    const deleteElementButton = this._element.querySelector('.element__delete');
    // Вешаем функцию на событие нажатия по кнопке удаления карточки
    deleteElementButton.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
  }
  // Приватный метод, устанавливающий слушатели событий
  _setEventListeners() {
    this._setLikeButton();
    this._setDeleteElementButton();
    const sectionElementPhoto = this._element.querySelector('.element__photo');
    // Вешаем функцию на событие нажатия по фотографии для открытия попапа с картинкой
    sectionElementPhoto.addEventListener('click', () => {
      document.querySelector('.popup__photo').src = this._link;
      document.querySelector('.popup__caption').textContent = this._name;
      openPopup(imageForm);
    });
  }
}
