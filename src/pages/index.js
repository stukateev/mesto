import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
    buttonUserInfo,
    jobInput,
    jobPage,
    namePage,
    nameInput,
    popupUserInfo,
    buttonAddCard,
    addCardForm,
    initialCards,
    cardTemplate,
    selectors,
    placesList
} from "../utils/constants"


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

function openImagePopup (cardTitleElement, cardImageElement, descriptionImagePopup, imgElementPopup){
    popupWithImage.open(cardTitleElement, cardImageElement, descriptionImagePopup, imgElementPopup);
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
});

popupEditProfile.setEventListeners();

buttonUserInfo.addEventListener('click', () => {
    popupEditProfile.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
    popupEditValidation.resetValidation()
});