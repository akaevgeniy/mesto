/*function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(addEventListeners);
}

enableValidation();

function addEventListeners(formElement) {
  const inputList = Array.from(document.querySelectorAll('.popup__input'));
  inputList.forEach(addListenersToInput);
  formElement.addEventListener('submit', handleSubmit);
  formElement.addEventListener('input', handleFormInput);
  setSubmitButtonState(formElement);
}

function handleFormInput(evt) {
  const formElement = evt.currentTarget;
  setSubmitButtonState(formElement);
}

function setSubmitButtonState(formElement) {
  const submitButton = formElement.querySelector('.popup__submit');
  submitButton.disabled = !formElement.checkValidity();
  submitButton.classList.toggle('popup__submit_invalid', !formElement.checkValidity());
}

function handleSubmit(evt) {
  evt.preventDefault();
  const formElement = evt.target;
  const data = Array.from(document.querySelectorAll('.popup__input')).reduce((sum, inputElement) => {
    sum[inputElement.name] = inputElement.value;
    return sum;
  }, {});
  console.log(data);
}

function addListenersToInput(inputElement) {
  inputElement.addEventListener('input', handleFieldValidation);
}

function handleFieldValidation(evt) {
  const element = evt.target;
  const errorSpan = document.querySelector(`#${element.id}-error`);

  if (element.validity.valid) {
    element.classList.remove('popup__input_state_invalid');
  } else {
    element.classList.add('popup__input_state_invalid');
  }
  errorSpan.textContent = element.validationMessage;
}
 console.log();
*/
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

function toggleButtonState(inputList, buttonElement, inactiveBtn) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveBtn);
    buttonElement.disabled = hasInvalidInput(inputList);
  } else {
    buttonElement.classList.remove(inactiveBtn);
    buttonElement.disabled = hasInvalidInput(inputList);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, inputError, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputError, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputError, errorClass);
  }
}

function showInputError(formElement, inputElement, errorMessage, inputError, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputError, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputError);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
