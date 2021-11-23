//В массив добавляем 6 карточек с местами и ссылками на фото
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
//объект настроек с селекторами и классами формы для проверки валидности формы
const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error_visible',
};
import { openPopup, imageForm, closePopup } from './utils.js';
// Находим в DOM попап, формы, инпуты и кнопки редактирования, добавления новой карточки, закрытия формы
//const elementContainer = document.querySelector('.elements');
const editButtonActive = document.querySelector('.profile__edit-button');
const addButtonActive = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_form_edit');
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const editForm = document.querySelector('.popup__form_edit-form');
const nameInput = editForm.querySelector('.popup__input_is_name');
const aboutInput = editForm.querySelector('.popup__input_is_about');
const editFormInputs = editForm.querySelectorAll('.popup__input');
const editFormErrors = editForm.querySelectorAll('.popup__error');
const editFormSubmitButton = editForm.querySelector('.popup__submit');
const addPopup = document.querySelector('.popup_form_add-element');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
const addForm = document.querySelector('.popup__form_add-form');
const nameAddInput = addForm.querySelector('.popup__input_is_add-name');
const linkAddInput = addForm.querySelector('.popup__input_is_add-link');
const addFormSubmitButton = addForm.querySelector('.popup__submit');
const imagePopupCloseButton = imageForm.querySelector('.popup__close');
const namePage = document.querySelector('.profile__name');
const aboutPage = document.querySelector('.profile__about');
//импортируем класс FormValidator
import { FormValidator } from './FormValidator.js';
//создается отдельный экземпляр класса FormValidator для каждой формы
const validatorAddForm = new FormValidator(settingsObject, addForm);
const validatorEditForm = new FormValidator(settingsObject, editForm);
validatorAddForm.enableValidation();
validatorEditForm.enableValidation();
//импортируем класс Card
import { Card } from './card.js';
const createCard = (item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  return cardElement;
};
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.append(element);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}

//Создаем класс Popup, который отвечает за открытие и закрытие попапа
class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    document.querySelector(this._popupSelector).classList.add('popup_is-opened');
    //  document.querySelector(this._popupSelector).addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', () => {
      this._handleEscClose();
    });
  }
  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_is-opened');
    // document.querySelector(this._popupSelector).removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', () => {
      this._handleEscClose();
    });
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _setEventListeners() {
    document
      .querySelector(this._popupSelector)
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.close();
      });
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open() {
    /*document.querySelector('.popup__photo').src = this._link;
    document.querySelector('.popup__caption').textContent = this._name;*/
    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }
  _setEventListeners() {
    super._setEventListeners();
    if (this._popupSelector === '.popup__form_edit-form') {
      document.querySelector(this._popupSelector).addEventListener('submit', () => submitProfileForm);
    } else if (this._popupSelector === '.popup_form_add-element') {
      document.querySelector(this._popupSelector).addEventListener('submit', () => addElement);
    }
  }
  close() {
    super.close();
    document.querySelector(this._popupSelector).reset();
  }
}

class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }
  getUserInfo() {
    const nameUser = document.querySelector(this._nameSelector).textContent;
    const aboutUser = document.querySelector(this._aboutSelector).textContent;
    return { name: nameUser, about: aboutUser };
  }
  setUserInfo() {
    document.querySelector(this._nameSelector).textContent = nameInput.value;
    document.querySelector(this._aboutSelector).textContent = aboutInput.value;
    //close popup
  }
}
//Функция для заполнения полей редактирования профиля
const setInputsProfileForm = () => {
  nameInput.value = namePage.textContent;
  aboutInput.value = aboutPage.textContent;
};
//Функция для задания у формы редактирования профиля изначальных значений инпутов, спанов с ошибками и состояния кнопки
const editFormDefaultState = () => {
  editFormSubmitButton.classList.remove('popup__submit_invalid');
  editFormSubmitButton.disabled = false;
  editFormInputs.forEach((formInput) => {
    formInput.classList.remove('popup__input_state_invalid');
  });
  editFormErrors.forEach((formError) => {
    formError.textContent = '';
  });
};
// Функция для записи в инпуты формы данных о пользователе со страницы при открытии окна, вызывается функция для задания стандартных значений
const openProfileForm = () => {
  setInputsProfileForm();
  editFormDefaultState();
  openPopup(editPopup);
};
// Функция редактирования профиля, переопределяем submit для перезаписывания полей из инпутов на страницу
const submitProfileForm = (evt) => {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  closePopup(editPopup);
};
// Функция добавления новой карточки в контейнер
const addElement = (event) => {
  event.preventDefault();
  const newCard = [
    {
      name: nameAddInput.value,
      link: linkAddInput.value,
    },
  ];
  //Создаем экземпляр класса с одной новой карточкой
  // const sectionNew = new Section({ items: newCard, renderer: createCard }, '.elements');
  // sectionNew.addItem();
  //Очищаем поля ввода, восстанавливаем стандартные значения всем элементам формы
  addForm.reset();
  //делаем кнопку формы с невалидными полями неактивной
  addFormSubmitButton.classList.add('popup__submit_invalid');
  addFormSubmitButton.disabled = true;
  //вызов функции закрытия попапа
  closePopup(addPopup);
};
// Вешаем слушатели событий для открытия/закрытия попапов и пересохранения данных, добавления новой карточки
editButtonActive.addEventListener('click', openProfileForm);
addButtonActive.addEventListener('click', () => openPopup(addPopup));
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imageForm));
editForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addElement);
