const editForm = document.querySelector(".popup");
const editFormClose = editForm.querySelector(".popup__close");
const editButtonClc = document.querySelector(".profile__edit-button");

function toggleEditForm() {
  editForm.classList.toggle("popup_is-opened");
}

editButtonClc.addEventListener("click", toggleEditForm);
editFormClose.addEventListener("click", toggleEditForm);
