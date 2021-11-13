export const imageForm = document.querySelector('.popup_form_image');
// Функция для открытия модального окна, добавляем попапу класс и добавляем слушатели на закрытие по оверлею и Escape
//экспортируем для использования в классе Card
export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
};
// Функция для закрытия модального окна, удаляем у попапа класс, удаляем слушатели на закрытие по оверлею и Escape
export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
};
// Функция для закрытия модального окна по клику на оверлей
export const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
// Функция для закрытия модального окна по нажатию на Esc
export const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};
