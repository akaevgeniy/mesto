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
const addPopup = document.querySelector('.popup_form_add-element');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
const addForm = document.querySelector('.popup__form_add-form');
const nameAddInput = addForm.querySelector('.popup__input_is_add-name');
const linkAddInput = addForm.querySelector('.popup__input_is_add-link');
const imageForm = document.querySelector('.popup_form_image');
const imagePopupCloseButton = imageForm.querySelector('.popup__close');
const namePage = document.querySelector('.profile__name');
const aboutPage = document.querySelector('.profile__about');
// Функция добавления новой карточки
const renderElement = (taskName) => {
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
  // Добавление карточек в контейнер elements (дальнейшее добаление новой карточки в начало, реверс-массива в начало равно добавлению в конец)
  elementContainer.prepend(sectionElement);
};
// Перебираем реверсированный массив с карточками, в качестве колбэка функция добавления новой карточки
initialCards.reverse();
initialCards.forEach(renderElement);
// Функция для открытия модального окна, добавляем попапу класс,
// при открытии окна данные со страницы записываюся в инпуты формы
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}
// Функция для закрытия модального окна, удаляем у попапа и форм классы
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
function openProfileForm() {
  nameInput.value = namePage.textContent;
  aboutInput.value = aboutPage.textContent;
  openPopup(editPopup);
}
// Переопределяем submit для перезаписывания полей из инпутов на страницу
function submitProfileForm(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  closePopup(editPopup);
}
// Функция добавления новой карточки в контейнер
const addElement = (event) => {
  event.preventDefault();
  const taskName = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };
  //Вызов функции добавления элементов в контейнер
  renderElement(taskName);
  //Очищаем поля ввода
  nameAddInput.value = '';
  linkAddInput.value = '';
  closePopup(addPopup);
};
// Вешаем слушатели событий для открытия/закрытия попапа и пересохранения данных, добавления новой карточки
editButtonActive.addEventListener('click', openProfileForm);
addButtonActive.addEventListener('click', () => openPopup(addPopup));
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imageForm));
editForm.addEventListener('submit', submitProfileForm);
addForm.addEventListener('submit', addElement);
