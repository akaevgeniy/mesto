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

//Создаем экземпляры Card при помощи класса Section
const CardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card(item, cardSelector, (imageFormSelector, imageInfo) => {
        const popup = new PopupWithImage(imageFormSelector, imageInfo);
        popup.open();
      });
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
    },
  },
  containerSelector
);

CardList.renderItems();
// создается экземпляр класса с информацией о пользователе
const user = new UserInfo({ nameSelector: namePageSelector, aboutSelector: aboutPageSelector });
//создаем экземпляр класса формы редактирования данных
const editPopupForm = new PopupWithForm(editPopupSelector, (inputs) => {
  user.setUserInfo({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about });
  editPopupForm.close();
});
//создаем экземпляр класса формы добавления новой карточки
const addPopupForm = new PopupWithForm(addPopupSelector, (inputs) => {
  const card = new Card(
    { name: inputs.popup__input_is_add_name, link: inputs.popup__input_is_add_link },
    cardSelector,
    (imageFormSelector, imageInfo) => {
      const popup = new PopupWithImage(imageFormSelector, imageInfo);
      popup.open();
    }
  );
  const cardElement = card.generateCard();
  CardList.addItem(cardElement);
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
