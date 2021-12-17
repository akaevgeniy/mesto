// Класс, создающий карточку
export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
  // Публичный метод для установки лайка
  setLikeButton() {
    this._handleLikeClick(this._id);
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  // Публичный метод для удаления элемента
  setDeleteElementButton() {
    this._handleDeleteIconClick(this._id);
    // this._element.remove();
    // this._element = null;
  }
  //публичный метод, добавляющий количество лайков из сервера в разметку
  initialLikeCount() {
    this._element.querySelector('.element__like-count').textContent = this._likes.length;
  }
  _deleteButtonHidden() {
    if (this._owner._id != 'a836f126de8651dc281b558d') {
      this._element.querySelector('.element__delete').classList.add('element__delete_is-hidden');
    }
  }
  // Приватный метод, устанавливающий слушатели событий
  _setEventListeners() {
    const sectionElementPhoto = this._element.querySelector('.element__photo');
    const elementLikeButton = this._element.querySelector('.element__like');
    const deleteElementButton = this._element.querySelector('.element__delete');
    // Вешаем функцию на событие нажатия по фотографии для открытия попапа с картинкой
    sectionElementPhoto.addEventListener('click', () => {
      const imageInfo = { link: this._link, name: this._name };
      this._handleCardClick(imageInfo);
    });
    // Вешаем функцию на событие нажатия по кнопке лайка
    elementLikeButton.addEventListener('click', () => {
      this.setLikeButton();
    });
    // Вешаем функцию на событие нажатия по кнопке удаления карточки
    deleteElementButton.addEventListener('click', () => {
      this.setDeleteElementButton();
    });
    //отображаем количество лайков
    this.initialLikeCount();
    this._deleteButtonHidden();
  }
}
