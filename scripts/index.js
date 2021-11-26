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
//Создаем экземпляры Card при помощи класса Section
const CardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card(item, '.element-template');
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
    },
  },
  '.elements'
);

CardList.renderItems();

const user = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });

const editPopupForm = new PopupWithForm('.popup_form_edit', () => {
  const inputs = editPopupForm._getInputValues();
  user.setUserInfo({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about });
  editPopupForm.close();
});

const addPopupForm = new PopupWithForm('.popup_form_add-element', () => {
  const inputs = addPopupForm._getInputValues();
  const newCard = { name: inputs.popup__input_is_add_name, link: inputs.popup__input_is_add_link };
  const sectionNew = new Section(
    {
      items: [newCard],
      renderer: (item) => {
        const card = new Card(item, '.element-template');
        const cardElement = card.generateCard();
        sectionNew.addItem(cardElement);
      },
    },
    '.elements'
  );
  sectionNew.renderItems();
  addPopupForm.close();
});
/*//Функция для заполнения полей редактирования профиля
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
  //Очищаем поля ввода, восстанавливаем стандартные значения всем элементам формы
  addForm.reset();
  //делаем кнопку формы с невалидными полями неактивной
  addFormSubmitButton.classList.add('popup__submit_invalid');
  addFormSubmitButton.disabled = true;
  //вызов функции закрытия попапа
  closePopup(addPopup);
};*/
// Вешаем слушатели событий для открытия/закрытия попапов и пересохранения данных, добавления новой карточки
editButtonActive.addEventListener('click', () => {
  nameInput.value = user.getUserInfo().name;
  aboutInput.value = user.getUserInfo().about;
  editPopupForm.open();
});
addButtonActive.addEventListener('click', () => addPopupForm.open());
