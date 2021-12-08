import './index.css';
//импортируем константы
import {
  initialCards,
  settingsObject,
  addForm,
  editForm,
  cardSelector,
  containerSelector,
  namePageSelector,
  aboutPageSelector,
  editPopupSelector,
  addPopupSelector,
  editButtonActive,
  addButtonActive,
  nameInput,
  aboutInput,
  imageFormSelector,
  confirmPopupSelector,
  avatarPopupSelector,
  avatarUpdateActive,
  profileAvatar,
  avatarForm,
} from '../utils/constants.js';
// импортируем класс для работы с Api
import { api } from '../components/Api';
api
  .getInitialCards()
  .then((result) => {
    return result.reverse();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
//Загружаем информацию о пользователе с сервера
api.getUserProfile().then((result) => {
  profileAvatar.src = result.avatar;
  document.querySelector(namePageSelector).textContent = result.name;
  document.querySelector(aboutPageSelector).textContent = result.about;
});
//импортируем класс FormValidator
import { FormValidator } from '../components/FormValidator.js';
//создается отдельный экземпляр класса FormValidator для каждой формы
//импортируем класс Card
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
const validatorAddForm = new FormValidator(settingsObject, addForm);
const validatorEditForm = new FormValidator(settingsObject, editForm);
const validatorAvatarForm = new FormValidator(settingsObject, avatarForm);
validatorAddForm.enableValidation();
validatorEditForm.enableValidation();
validatorAvatarForm.enableValidation();
//функция для создания экземпляра  карточки
const createCard = function ({ name, link }) {
  const card = new Card({ name, link }, cardSelector, (imageInfo) => {
    const popup = new PopupWithImage(imageFormSelector, imageInfo);
    popup.setEventListeners();
    popup.open();
  });
  return card.generateCard();
};
//Создаем экземпляры Card при помощи класса Section
const cardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  containerSelector
);
//рендерим карточки в контейнер
cardList.renderItems();
// создается экземпляр класса с информацией о пользователе
const user = new UserInfo({ nameSelector: namePageSelector, aboutSelector: aboutPageSelector });
//создаем экземпляр класса формы редактирования данных
//api.updateUserProfile('Евгений Сергеев', 'Турист на минималках');
const editPopupForm = new PopupWithForm(editPopupSelector, (inputs) => {
  user.setUserInfo({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about });
  api.updateUserProfile(inputs.popup__input_is_name, inputs.popup__input_is_about);
});
//вызываем метод, вешающий слушатели событий формы
editPopupForm.setEventListeners();
//создаем экземпляр класса формы добавления новой карточки
const addPopupForm = new PopupWithForm(addPopupSelector, (inputs) => {
  cardList.addItem(createCard({ name: inputs.popup__input_is_add_name, link: inputs.popup__input_is_add_link }));
});
addPopupForm.setEventListeners();
//создаем экземпляр класса формы изменения аватара
const avatarPopupForm = new PopupWithForm(avatarPopupSelector, (input) => {
  profileAvatar.src = input.popup__input_is_avatar_link;
  api.updateAvatar(input.popup__input_is_avatar_link);
});
avatarPopupForm.setEventListeners();
// const confPopupForm = new PopupWithForm(confirmPopupSelector);
// Вешаем слушатели событий для открытия попапов с формами
editButtonActive.addEventListener('click', () => {
  nameInput.value = user.getUserInfo().userName;
  aboutInput.value = user.getUserInfo().userDescription;
  editPopupForm.open();
  //включаем валидацию формы
  validatorEditForm.enableValidation();
});
addButtonActive.addEventListener('click', () => {
  addPopupForm.open();
  //включаем валидацию формы
  validatorAddForm.enableValidation();
});
//открываем попап для редактирования аватара пользователя
avatarUpdateActive.addEventListener('click', () => {
  avatarPopupForm.open();
  validatorAvatarForm.enableValidation();
});
