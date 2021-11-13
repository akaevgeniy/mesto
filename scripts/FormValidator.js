// Класс, валидирующий форму, экспортируем класс для дальнейшей работы в главном скрипте
export class FormValidator {
  //Делаем в конструкторе класса деструктурирующее присваивание объекта
  constructor(settingsObject, elementForm) {
    ({
      formSelector: this._formSelector,
      inputSelector: this._inputSelector,
      submitButtonSelector: this._submitButtonSelector,
      inactiveButtonClass: this._inactiveButtonClass,
      inputErrorClass: this._inputErrorClass,
      errorClass: this._errorClass,
    } = settingsObject);
    this._elementForm = elementForm;
  }
  //Публичный метод для включения валидации формы
  enableValidation() {
    this._form = this._elementForm;
    this._setEventListeners();
  }
  //приватный метод для назначения событий при валидации формы
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const inactiveButton = this._inactiveButtonClass;
    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  //приватный метод для проверки и изменения состояния кнопки submit формы
  _toggleButtonState = () => {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const inactiveButton = this._inactiveButtonClass;
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(inactiveButton);
      buttonElement.disabled = this._hasInvalidInput();
    } else {
      buttonElement.classList.remove(inactiveButton);
      buttonElement.disabled = this._hasInvalidInput();
    }
  };
  //в приватном методе проверяем, является ли хотя бы одно значение инпута false, т.е. не прошло валидацию
  _hasInvalidInput = () => {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  //приватный метод для проверки валидности, если поле не валидно, то вызываем showInputError с параметрами,
  //иначе вызываем hideInputError и скрываем сообщение об ошибке валидации
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  //приватный метод для показа сообщения об ошибке валидации, span находим по id
  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    //добавляем классы для инпута и спана, ошибка валидации, подчеркивание инпута красной рамкой
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  //приватный метод для скрытия сообщения об ошибке валидации, span находим по id
  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    //удаляем классы у инпута и спана
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}
