import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const buttonUserInfo = document.querySelector(".user-info__edit");
const popupUserInfo = document.querySelector(".popup-edit-profile");
const namePage = document.querySelector(".user-info__name")
const jobPage = document.querySelector(".user-info__job")
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.elements["nameX"]
const jobInput = profileForm.elements["info"]
const placesList = document.querySelector('.places-list');
const buttonAddCard = document.querySelector(".user-info__button");
const addCardForm = document.forms["add-card-form"];
const cardTemplate = document.querySelector('#place-card-template')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const profileField = {
    nameField: namePage,
    jobField: jobPage
}

const userInfo = new UserInfo(profileField);

const popupEditValidation = new FormValidator(selectors, popupUserInfo);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(selectors, addCardForm);
popupAddValidation.enableValidation();


function createCard(item) {
    const card = new Card(item, cardTemplate, openImagePopup);
    return card.generateCard()
}
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    }
}, placesList)
cardSection.renderItems();

const popupAddCard = new PopupWithForm({
    handleFormSubmit: (item) => {
        const newCard = createCard(item)
        cardSection.addItem(newCard)

    }
}, '.popup-add-card');

const popupWithImage = new PopupWithImage('.popup-image')

function openImagePopup (cardTitleElement, cardImageElement){
    popupWithImage.open(cardTitleElement, cardImageElement);
}

const popupEditProfile = new PopupWithForm({
    handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
    }
}, '.popup-edit-profile');


popupWithImage.setEventListeners();

popupAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    popupAddValidation.resetValidation()
    popupAddValidation._toggleButtonState()
});

popupEditProfile.setEventListeners();

buttonUserInfo.addEventListener('click', () => {
    popupEditProfile.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
    popupEditValidation.resetValidation()
});