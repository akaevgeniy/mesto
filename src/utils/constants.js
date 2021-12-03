//В массив добавляем 6 карточек с местами и ссылками на фото
export const initialCards = [
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
export const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error_visible',
};
// Константы с селекторами и элементами для использования в классах
export const editButtonActive = document.querySelector('.profile__edit-button');
export const addButtonActive = document.querySelector('.profile__add-button');
export const avatarUpdateActive = document.querySelector('.profile__avatar');
export const editPopupSelector = '.popup_form_edit';
export const editForm = document.querySelector('.popup__form_edit-form');
export const nameInput = editForm.querySelector('.popup__input_is_name');
export const aboutInput = editForm.querySelector('.popup__input_is_about');
export const addPopupSelector = '.popup_form_add-element';
export const addForm = document.querySelector('.popup__form_add-form');
export const imageFormSelector = '.popup_form_image';
export const namePageSelector = '.profile__name';
export const aboutPageSelector = '.profile__about';
export const cardSelector = '.element-template';
export const containerSelector = '.elements';
export const confirmPopupSelector = '.popup_form_confirm';
export const avatarPopupSelector = '.popup_form_avatar-update';
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarForm = document.querySelector('.popup__form_avatar-update');
