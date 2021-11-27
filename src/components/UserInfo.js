//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }
  //в методе возвращаем объект с данными пользователя
  getUserInfo() {
    const nameUser = document.querySelector(this._nameSelector).textContent;
    const aboutUser = document.querySelector(this._aboutSelector).textContent;
    return { name: nameUser, about: aboutUser };
  }
  //метод setUserInfo принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._aboutSelector).textContent = about;
  }
}
