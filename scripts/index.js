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
  sectionElementPhoto.src = taskName.link;
  sectionElementPhoto.alt = taskName.name;
  sectionElementTitle.textContent = taskName.name;
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
}
// Переопределяем submit для перезаписывания полей из инпутов на страницу
function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  removePopup();
}
// Вешаем слушатели событий для открытия/закрытия попапа и пересохранения данных
editButtonActive.addEventListener('click', () => addPopup(0));
addButtonActive.addEventListener('click', () => addPopup(1));
popupCloseButton.addEventListener('click', removePopup);
formPopups[0].addEventListener('submit', formSubmitHandler);
