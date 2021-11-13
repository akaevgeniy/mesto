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
  // Приватный метод, устанавливающий слушатели событий
  _setEventListeners() {
    const elementLikeButton = this._element.querySelector('.element__like');
    // Вешаем функцию на событие нажатия по кнопке лайка
    elementLikeButton.addEventListener('click', () => {
      elementLikeButton.classList.toggle('element__like_active');
    });
    // Вешаем функцию на событие нажатия по кнопке удаления карточки
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.querySelector('.element__delete').closest('.element').remove();
    });
    // Вешаем функцию на событие нажатия по фотографии для открытия попапа с картинкой
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      document.querySelector('.popup__photo').src = this._link;
      document.querySelector('.popup__caption').textContent = this._name;
      openPopup(imageForm);
    });
  }
}
