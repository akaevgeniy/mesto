class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._content_type = options.headers['Content-Type'];
  }
  //выносим в отдельный метод проверку ответа от сервера
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
  }
  //публичный метод, загружающий с сервера информацию о карточках
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //метод, загружающий информацию о пользователе
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //метод для изменения данных пользователя на сервере
  updateUserProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //метод для изменения ссылки на аватар пользователя на сервере
  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //метод для добавления на сервер новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //метод для удаления карточки из БД сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //реализация PUT-запроса для постановки лайка
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  //Удаление лайка, отправляем DELETE-запрос
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
}
//Создаем и экспортируем экземпляр Api со ссылкой на сервер и данных об авторизации
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '23d5ae49-b998-4b92-a5a2-4ca503425f9c',
    'Content-Type': 'application/json',
  },
});
