import './index.css';
//импортируем константы
import {
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
//импортируем класс FormValidator
import { FormValidator } from '../components/FormValidator.js';
//импортируем классы Card и т.д.
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
//создается отдельный экземпляр класса FormValidator для каждой формы
const validatorAddForm = new FormValidator(settingsObject, addForm);
const validatorEditForm = new FormValidator(settingsObject, editForm);
const validatorAvatarForm = new FormValidator(settingsObject, avatarForm);
validatorAddForm.enableValidation();
validatorEditForm.enableValidation();
validatorAvatarForm.enableValidation();
//функция для создания экземпляра  карточки
const createCard = function (data) {
  const card = new Card(
    {
      data,
      handleCardClick: (imageInfo) => {
        const popup = new PopupWithImage(imageFormSelector, imageInfo);
        popup.setEventListeners();
        popup.open();
      },
      handleLikeClick: (confirm) => {
        if (confirm) {
          api
            .deleteLike(data._id)
            .then((result) => {
              console.log(result.likes);
              card.setLikeButton();
            })
            .catch((err) => console.log(err));
        } else if (!confirm) {
          api
            .setLike(data._id)
            .then((result) => {
              console.log(result);
              card.setLikeButton();
              card.initialLikeCount();
            })
            .catch((err) => console.log(err));
        }
      },
      handleDeleteIconClick: (id) => {
        const popup = new PopupWithSubmit(
          confirmPopupSelector,
          (id) => {
            api
              .deleteCard(id)
              .then((result) => {
                console.log(result);
                card.removeCard();
              })
              .catch((err) => console.log(err));
          },
          id
        );
        popup.setEventListeners();
        popup.open();
      },
    },
    cardSelector
  );
  return card.generateCard();
};
//функция для изменения текста при прелоад
function renderLoading(isLoading, popupSelector) {
  if (isLoading) {
    document.querySelector(popupSelector).querySelector('.popup__submit').value = 'Сохранение...';
  } else if (!isLoading) {
    document.querySelector(popupSelector).querySelector('.popup__submit').value = 'Сохранить';
  }
}
//Загружаем информацию о пользователе с сервера
api
  .getUserProfile()
  .then((result) => {
    profileAvatar.src = result.avatar;
    document.querySelector(namePageSelector).textContent = result.name;
    document.querySelector(aboutPageSelector).textContent = result.about;
  })
  .catch((err) => console.log(err));
//Создаем экземпляры Card при помощи класса Section
api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    const cardList = new Section(
      {
        items: result.reverse(),
        renderer: (item) => {
          cardList.addItem(createCard(item));
        },
      },
      containerSelector
    );
    //рендерим карточки в контейнер
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
// создается экземпляр класса с информацией о пользователе
const user = new UserInfo({ nameSelector: namePageSelector, aboutSelector: aboutPageSelector });
//создаем экземпляр класса формы редактирования данных
const editPopupForm = new PopupWithForm(editPopupSelector, (inputs) => {
  renderLoading(true, editPopupSelector);
  api
    .updateUserProfile({ name: inputs.popup__input_is_name, about: inputs.popup__input_is_about })
    .then((result) => {
      user.setUserInfo({ name: result.name, about: result.about });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editPopupSelector);
    });
});
//вызываем метод, вешающий слушатели событий формы
editPopupForm.setEventListeners();
//создаем экземпляр класса формы добавления новой карточки
const addPopupForm = new PopupWithForm(addPopupSelector, (inputs) => {
  renderLoading(true, addPopupSelector);
  api
    .addNewCard({ name: inputs.popup__input_is_add_name, link: inputs.popup__input_is_add_link })
    .then((result) => {
      const cardList = new Section(
        {
          items: [result],
          renderer: (item) => {
            cardList.addItem(createCard(item));
          },
        },
        containerSelector
      );
      //рендерим карточки в контейнер
      cardList.renderItems();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, addPopupSelector);
    });
});
addPopupForm.setEventListeners();
//создаем экземпляр класса формы изменения аватара
const avatarPopupForm = new PopupWithForm(avatarPopupSelector, (input) => {
  renderLoading(true, avatarPopupSelector);
  api
    .updateAvatar(input.popup__input_is_avatar_link)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, avatarPopupSelector);
    });
});
avatarPopupForm.setEventListeners();
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
