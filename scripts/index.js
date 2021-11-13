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
// Находим в DOM попап, формы, инпуты и кнопки редактирования, добавления новой карточки, закрытия формы
const elementContainer = document.querySelector('.elements');
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
const imageForm = document.querySelector('.popup_form_image');
const imagePopupCloseButton = imageForm.querySelector('.popup__close');
const namePage = document.querySelector('.profile__name');
const aboutPage = document.querySelector('.profile__about');
// Функция добавления карточек в контейнер elements (дальнейшее добавление новой карточки в начало, реверс-массива в начало равно добавлению в конец)
const renderElement = (cardElement) => {
  elementContainer.prepend(cardElement);
};
//импортируем класс Card
import { Card } from './card.js';
// Перебираем реверсированный массив с карточками, создаем 6 экземпляров класса Card
initialCards.reverse();
initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  // Добавляем карточки в контейнер
  renderElement(cardElement);
});
//импортируем класс FormValidator
import { FormValidator } from './FormValidator.js';
const validit = new FormValidator(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__error_visible',
  },
  addForm
);
const validit2 = new FormValidator(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__error_visible',
  },
  editForm
);
validit.enableValidation();
validit2.enableValidation();
// Функция для открытия модального окна, добавляем попапу класс и добавляем слушатели на закрытие по оверлею и Escape
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};
// Функция для закрытия модального окна, удаляем у попапа класс, удаляем слушатели на закрытие по оверлею и Escape
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
};
// Функция для закрытия модального окна по клику на оверлей
const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
// Функция для закрытия модального окна по нажатию на Esc
const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};
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
  const newCard = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };
  //создаем новый экземпляр класса Card
  const card = new Card(newCard, '.element-template');
  const cardElement = card.generateCard();
  //Вызов функции добавления элементов в контейнер
  renderElement(cardElement);
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
