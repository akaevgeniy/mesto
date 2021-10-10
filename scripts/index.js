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

// Находим в DOM попап, форму, инпуты и кнопки редактирования, закрытия формы
const elementContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const layerPopup = document.querySelector('.popup');
const popupCloseButton = layerPopup.querySelector('.popup__close');
const editButtonActive = document.querySelector('.profile__edit-button');
const addButtonActive = document.querySelector('.profile__add-button');
const formPopups = document.querySelectorAll('.popup__form');
let nameInput = formPopups[0].querySelector('.popup__input_is_name');
let aboutInput = formPopups[0].querySelector('.popup__input_is_about');
let nameAddInput = formPopups[1].querySelector('.popup__input_is_add-name');
let linkAddInput = formPopups[1].querySelector('.popup__input_is_add-link');
let namePage = document.querySelector('.profile__name');
let aboutPage = document.querySelector('.profile__about');

const renderElement = (taskName) => {
  const sectionElement = elementTemplate.cloneNode(true);
  const sectionElementTitle = sectionElement.querySelector('.element__title');
  const sectionElementPhoto = sectionElement.querySelector('.element__photo');
  const elementLikeButton = sectionElement.querySelector('.element__like');
  sectionElementPhoto.src = taskName.link;
  sectionElementPhoto.alt = taskName.name;
  sectionElementTitle.textContent = taskName.name;
  elementLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  const elementDeleteBtn = sectionElement.querySelector('.element__delete');
  elementDeleteBtn.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  sectionElementPhoto.addEventListener('click', (ev) => {
    const layoutPhoto = document.querySelector('.popup__picture');
    const zoomPhoto = layoutPhoto.querySelector('.popup__photo');
    const zoomPhotoCaption = layoutPhoto.querySelector('.popup__caption');
    const popupContainer = document.querySelector('.popup__container');
    zoomPhoto.src = ev.target.src;
    zoomPhoto.alt = ev.target.alt;
    zoomPhotoCaption.textContent = ev.target.alt;
    layerPopup.classList.add('popup_is-opened');
    layoutPhoto.classList.add('popup__picture_is-opened');
    popupContainer.classList.add('popup__container_pic-zoom');
  });
  elementContainer.append(sectionElement);
};

initialCards.forEach(renderElement);

// Функция для открытия модального окна, добавляем попапу класс,
// при открытии окна данные со страницы записываюся в инпуты формы
function addPopup(index) {
  layerPopup.classList.add('popup_is-opened');
  formPopups[index].classList.add('popup__form_is-opened');
  nameInput.value = namePage.textContent;
  aboutInput.value = aboutPage.textContent;
}
// Функция для закрытия модального окна, удаляем у попапа класс
function removePopup() {
  layerPopup.classList.remove('popup_is-opened');
  formPopups[0].classList.remove('popup__form_is-opened');
  formPopups[1].classList.remove('popup__form_is-opened');
  document.querySelector('.popup__picture').classList.remove('popup__picture_is-opened');
  document.querySelector('.popup__container').classList.remove('popup__container_pic-zoom');
}
// Переопределяем submit для перезаписывания полей из инпутов на страницу
function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  removePopup();
}
// Функция добавления нового места в контейнер
const addElement = (event) => {
  event.preventDefault();
  const taskName = {
    name: nameAddInput.value,
    link: linkAddInput.value,
  };

  renderElement(taskName);
  nameAddInput.value = '';
  linkAddInput.value = '';

  removePopup();
};
// Вешаем слушатели событий для открытия/закрытия попапа и пересохранения данных
editButtonActive.addEventListener('click', () => addPopup(0));
addButtonActive.addEventListener('click', () => addPopup(1));
popupCloseButton.addEventListener('click', removePopup);
formPopups[0].addEventListener('submit', formSubmitHandler);
formPopups[1].addEventListener('submit', addElement);
