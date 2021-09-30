const editForm = document.querySelector('.popup');
const editFormClose = editForm.querySelector('.popup__close');
const editButtonActive = document.querySelector('.profile__edit-button');
const formPopup = editForm.querySelector('.popup__container');
let nameInput = formPopup.querySelector('.popup__input_is_name');
let aboutInput = formPopup.querySelector('.popup__input_is_about');
let namePage = document.querySelector('.profile__name');
let aboutPage = document.querySelector('.profile__about');

function toggleEditForm() {
  editForm.classList.toggle('popup_is-opened');
  nameInput.value = namePage.textContent;
  aboutInput.value = aboutPage.textContent;
}
editButtonActive.addEventListener('click', toggleEditForm);
editFormClose.addEventListener('click', toggleEditForm);

function formSubmitHandler(evt) {
  evt.preventDefault();
  namePage.textContent = nameInput.value;
  aboutPage.textContent = aboutInput.value;
  editForm.classList.remove('popup_is-opened');
}

formPopup.addEventListener('submit', formSubmitHandler);
