//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ nameSelector, aboutSelector, userAvatar, id }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._userAvatar = userAvatar;
    this._id = id;
  }
  //в методе возвращаем объект с данными пользователя
  getUserInfo() {
    return {
      userName: document.querySelector(this._nameSelector).textContent,
      userDescription: document.querySelector(this._aboutSelector).textContent,
      userAvatar: this._userAvatar.src,
      id: this._id,
    };
  }
  //метод setUserInfo принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar, _id }) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._aboutSelector).textContent = about;
    this._userAvatar.src = avatar;
    this._id = _id;
  }
}
