import "../index.css";
import Main from "./Main.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ImagePopUp from "./ImagePopUp.js";
import { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import * as auth from "../utils/auth.js";

class FormValidator {
  constructor(configObj, formElement) {
    this._formElement = formElement;
    this._settings = configObj;
    this._formList = Array.from(
      document.querySelectorAll(this._settings.formSelector)
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorMessage = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const newValidator = new FormValidator(settings, formElement);
    newValidator._setEventListeners();
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit-disabled",
  inputErrorClass: "form__input-invalid",
  errorClass: "form__error",
});

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const history = useNavigate();

  useEffect(() => {
    async function handleCheckToken() {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setLoggedIn(false);
        return;
      }
      if (typeof token === "object") {
        try {
          const res = await auth.checkToken(JSON.stringify(token));
          const response = await res.json();
          const data = JSON.parse(JSON.stringify(response));
          setEmail(data.email);
          setLoggedIn(true);
          history("/");
        } catch (error) {}
      }
      if (typeof token === "string") {
        try {
          const res = await auth.checkToken(token);
          const response = await res.json();
          const data = JSON.parse(JSON.stringify(response));
          setEmail(data.email);
          setLoggedIn(true);
          history("/");
        } catch (error) {}
      }
    }
    handleCheckToken();
  }, [history]);

  useEffect(() => {
    async function getCurrentUser() {
      const response = await api.getUserInfo();
      setCurrentUser(response);
    }
    if (loggedIn) {
      getCurrentUser();
    }
  }, [loggedIn]);

  useEffect(() => {
    async function getCards() {
      const response = await api.getInitialCards();
      setCards(response);
    }
    if (loggedIn) {
      getCards();
    }
  }, [loggedIn]);

  function onLogin() {
    setLoggedIn(true);
    history("/");
  }
  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history("/signin");
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
    setIsFilterOn(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsFilterOn(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setIsFilterOn(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsFilterOn(true);
  }
  function handleSuccesTipOpen() {
    setIsSuccess(true);
    setIsFilterOn(true);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsFilterOn(false);
    setIsCardPopupOpen(false);
    setIsSuccess(false);
    setSelectedCard({});
  }
  function handleUpdateUser(userData) {
    api.setUserInfo(userData).then((newUser) => {
      setCurrentUser(newUser);
    });
    closeAllPopups();
  }
  function handleUpdateAvatar(link) {
    api.editUserAvatar(link);
    closeAllPopups();
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }
  function handleAddPlace(data) {
    api.addCard(data, currentUser._id).then((newCard) => {
      if (Array.isArray(cards)) {
        setCards([...cards, newCard]);
      } else {
        setCards([newCard]);
      }
    });
    closeAllPopups();
  }

  return (
    <div className="App">
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />

          <Routes>
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onClose={closeAllPopups}
                    isSuccess={isSucces}
                    isFilterOn={isFilterOn}
                    successInfo={handleSuccesTipOpen}
                    logIn={onLogin}
                  ></Login>
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    onClose={closeAllPopups}
                    isSuccess={isSucces}
                    isFilterOn={isFilterOn}
                    successInfo={handleSuccesTipOpen}
                  ></Register>
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    isFilterOn={isFilterOn}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
              }
            />
          </Routes>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            submitPlace={handleAddPlace}
          />

          <ImagePopUp
            link={selectedCard.link}
            title={selectedCard.name}
            onClose={closeAllPopups}
            isOpen={isCardPopupOpen}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
