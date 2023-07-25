

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  deleteLike(deleteId) {
    return fetch(`${this.baseUrl}/cards/${deleteId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  sendLike(likeId) {
    return fetch(`${this.baseUrl}/cards/${likeId}/likes`, {
      method: 'PUT',
      headers: this.headers,

      body: JSON.stringify({})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  sendCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,

      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  sendUserInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,

      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  sendAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,

      body: JSON.stringify(avatar)
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  getCardsItem() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}