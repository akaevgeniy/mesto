export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }
  getUserInfo() {
    const nameUser = document.querySelector(this._nameSelector).textContent;
    const aboutUser = document.querySelector(this._aboutSelector).textContent;
    return { name: nameUser, about: aboutUser };
  }
  setUserInfo({ name, about }) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._aboutSelector).textContent = about;
  }
}
