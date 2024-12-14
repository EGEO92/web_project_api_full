class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Bien hecho!!! Cartas iniciales listas");
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("error geting the user: ");
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Bien hecho!!!");
      });
  }

  editUserAvatar(link) {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("error edit avatar");
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .then((result) => {
        return result;
      });
  }

  addCard(data, id) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        owner: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }
}

const api = new Api({
  //baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  baseUrl: "http://localhost:3000",
  headers: {
    //authorization: "072a79cd-90d0-408b-be9c-36f27d8f66a3",
    authorization: "",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default api;
