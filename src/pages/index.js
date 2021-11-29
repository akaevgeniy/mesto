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
} from '../utils/constants.js';
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
validatorAddForm.enableValidation();
validatorEditForm.enableValidation();
//функция для создания экземпляра  карточки
const creteCard = function ({ name, link }) {
  const card = new Card({ name, link }, cardSelector, (imageInfo) => {
    const popup = new PopupWithImage(imageFormSelector, imageInfo);
    popup.open();
  });
  return card.generateCard();
};
//Создаем экземпляры Card при помощи класса Section
const cardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      cardList.addItem(creteCard(item));
    },
  },
  containerSelector
);
//рендерим карточки в контейнер
cardList.renderItems();
// создается экземпляр класса с информацией о пользователе
const user = new UserInfo({ nameSelector: namePageSelector, aboutSelector: aboutPageSelector });
//создаем экземпляр класса формы редактирования данных
const editPopupForm = new PopupWithForm(editPopupSelector, (inputs) => {
  user.setUserInfo({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about });
  editPopupForm.close();
});
//создаем экземпляр класса формы добавления новой карточки
const addPopupForm = new PopupWithForm(addPopupSelector, (inputs) => {
  cardList.addItem(creteCard({ name: inputs.popup__input_is_add_name, link: inputs.popup__input_is_add_link }));
  addPopupForm.close();
});
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
