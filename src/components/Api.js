class Api {
  constructor(baseUrl) {
    this._url = baseUrl;
    this._inputName = document.getElementById("userInputfullName");
    this._about = document.getElementById("userInputDescription");
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // returns cards data from server
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserInfo() {
    fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._inputName.value,
        about: this._about.value,
      }),
    });
  }

  addNewCard(title, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    });
  }

  cardData() {
    this.getInitialCards();
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfilePicture(inputURL) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: inputURL,
      }),
    });
  }

  getCardId() {
    return fetch(`${this._url}/cards/`, {
      headers: {
        authorization: "9bdd55c3-52f9-457f-a17d-02b8ea63be13",
      },
    });
  }
}
const api = new Api("https://around.nomoreparties.co/v1/group-12");
export default api;
api.getCardId();
