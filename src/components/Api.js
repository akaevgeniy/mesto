class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._content_type = options.headers['Content-Type'];
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  updateUserProfile(name, about) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
  updateAvatar(url) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._content_type,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }
}
// другие методы работы с API

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '23d5ae49-b998-4b92-a5a2-4ca503425f9c',
    'Content-Type': 'application/json',
  },
});
/*export function reply() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-31/users/me', {
    headers: {
      authorization: '23d5ae49-b998-4b92-a5a2-4ca503425f9c',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}*/