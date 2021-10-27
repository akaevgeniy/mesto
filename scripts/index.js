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
const elementTemplate = document.querySelector('.element-template').content;
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
// Функция создания новой карточки
const createCard = (taskName) => {
  const sectionElement = elementTemplate.cloneNode(true);
  const sectionElementTitle = sectionElement.querySelector('.element__title');
  const sectionElementPhoto = sectionElement.querySelector('.element__photo');
  const elementLikeButton = sectionElement.querySelector('.element__like');
  sectionElementPhoto.src = taskName.link;
  sectionElementPhoto.alt = taskName.name;
  sectionElementTitle.textContent = taskName.name;
  // Вешаем функцию на событие нажатия по кнопке лайка
  elementLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  // Находим в ДОМ и вешаем функцию на событие нажатия по кнопке удаления карточки
  const elementDeleteBtn = sectionElement.querySelector('.element__delete');
  elementDeleteBtn.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  // Вешаем функцию на событие нажатия по фотографии для открытия попапа с картинкой
  sectionElementPhoto.addEventListener('click', (ev) => {
    const layoutPhoto = document.querySelector('.popup__picture');
    const zoomPhoto = layoutPhoto.querySelector('.popup__photo');
    const zoomPhotoCaption = layoutPhoto.querySelector('.popup__caption');
    zoomPhoto.src = ev.target.src;
    zoomPhoto.alt = ev.target.alt;
    zoomPhotoCaption.textContent = ev.target.alt;
    openPopup(imageForm);
  });
  return sectionElement;
};
// Функция добавления карточек в контейнер elements (дальнейшее добаление новой карточки в начало, реверс-массива в начало равно добавлению в конец)
const renderElement = (elem) => {
  elementContainer.prepend(createCard(elem));
};
// Перебираем реверсированный массив с карточками, в качестве колбэка функция добавления новой карточки
initialCards.reverse();
initialCards.forEach(renderElement);
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
//Функция для задания у формы редактирования профиля изначальных значений инпутов, спанов с ошибками и кнопки
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
// Функция для записи в инпуты формы данных о пользователе со страницы при открытии окна
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
  const taskName = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };
  //Вызов функции добавления элементов в контейнер
  renderElement(taskName);
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
