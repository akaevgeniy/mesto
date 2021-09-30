// Находим в DOM попап, форму, инпуты и кнопки редактирования, закрытия формы
const layerPopup = document.querySelector('.popup');
const popupCloseButton = layerPopup.querySelector('.popup__close');
const editButtonActive = document.querySelector('.profile__edit-button');
const formPopup = layerPopup.querySelector('.popup__form');
let nameInput = formPopup.querySelector('.popup__input_is_name');
let aboutInput = formPopup.querySelector('.popup__input_is_about');
let namePage = document.querySelector('.profile__name');
let aboutPage = document.querySelector('.profile__about');
// Функция для открытия модального окна, добавляем попапу класс,
// при открытии окна данные со страницы записываюся в инпуты формы
function addEditForm() {
  layerPopup.classList.add('popup_is-opened');
  nameInput.value = namePage.textContent;
  aboutInput.value = aboutPage.textContent;
}
// Функция для закрытия модального окна, удаляем у попапа класс
function removeEditForm() {
  layerPopup.classList.remove('popup_is-opened');
}
// Переопределяем submit для перезаписывания полей из инпутов на страницу
function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  removeEditForm();
}
// Вешаем слушатели событий для открытия/закрытия попапа и пересохранения данных
editButtonActive.addEventListener('click', addEditForm);
popupCloseButton.addEventListener('click', removeEditForm);
formPopup.addEventListener('submit', formSubmitHandler);
