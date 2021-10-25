// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error_visible',
});
//Функция для включения валидации всех форм
function enableValidation(settingsObject) {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  //перебираем элементы массива с формами попапа
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      settingsObject.inputSelector,
      settingsObject.submitButtonSelector,
      settingsObject.inactiveButtonClass,
      settingsObject.inputErrorClass,
      settingsObject.errorClass
    );
  });
}
//функция для назначения событий при валидации формы
function setEventListeners(formElement, input, button, inactiveBtn, inputError, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(input));
  const buttonElement = formElement.querySelector(button);
  const inactiveButton = inactiveBtn;

  toggleButtonState(inputList, buttonElement, inactiveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputError, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButton);
    });
  });
}
//функция для проверки состояния кнопки формы
function toggleButtonState(inputList, buttonElement, inactiveBtn) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveBtn);
    buttonElement.disabled = hasInvalidInput(inputList);
  } else {
    buttonElement.classList.remove(inactiveBtn);
    buttonElement.disabled = hasInvalidInput(inputList);
  }
}
//проверяем, является ли хотя бы одно значение инпута false, т.е. не прошло валидацию
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//
function checkInputValidity(formElement, inputElement, inputError, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputError, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputError, errorClass);
  }
}
//функция для показа сообщения об ошибке валидации, span находим по id
function showInputError(formElement, inputElement, errorMessage, inputError, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //добавляем классы для инпута и спана, ошибка валидации, подчеркивание инпута красной рамкой
  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
//функция для скрытия сообщения об ошибке валидации, span находим по id
function hideInputError(formElement, inputElement, inputError, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //удаляем классы у инпута и спана
  inputElement.classList.remove(inputError);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
