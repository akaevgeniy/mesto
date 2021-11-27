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
} from './utils/constants.js';
//импортируем класс FormValidator
import { FormValidator } from './FormValidator.js';
//создается отдельный экземпляр класса FormValidator для каждой формы
//импортируем класс Card
import { Card } from './card.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
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

const user = new UserInfo({ nameSelector: namePageSelector, aboutSelector: aboutPageSelector });

const editPopupForm = new PopupWithForm(editPopupSelector, (inputs) => {
  user.setUserInfo({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about });
  editPopupForm.close();
});

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
  validatorEditForm.enableValidation();
});
addButtonActive.addEventListener('click', () => {
  addPopupForm.open();
  validatorAddForm.enableValidation();
});
