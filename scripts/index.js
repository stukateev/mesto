import Card from "./Card.js";
import FormValidator from './FormValidator.js';

const buttonUserInfo = document.querySelector(".user-info__edit");
const popupUserInfo = document.querySelector(".popup-edit-profile");
const namePage = document.querySelector(".user-info__name")
const jobPage = document.querySelector(".user-info__job")
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.elements["nameX"]
const jobInput = profileForm.elements["info"]
const placesList = document.querySelector('.places-list');
const buttonAddCard = document.querySelector(".user-info__button");
const popupAddCard = document.querySelector(".popup-add-card");
const addCardForm = document.forms["add-card-form"];
const nameCardForm = addCardForm.elements["name"];
const urlCardForm = addCardForm.elements["link"];
export const popupImage = document.querySelector(".popup-image");
export const popupImageImg = popupImage.querySelector(".popup-image__img")
export const popupImageName = popupImage.querySelector(".popup-image__name")
const closeButtons = document.querySelectorAll('.popup__close');

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

function refreshValueInput(){
    nameInput.value = namePage.textContent
    jobInput.value = jobPage.textContent
}


function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    namePage.textContent = nameInput.value
    jobPage.textContent = jobInput.value
    closePopup(popupUserInfo)
}

profileForm.addEventListener('submit', handleProfileFormSubmit);



closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup( popup));
});
buttonUserInfo.addEventListener('click', function () {openPopup(popupUserInfo); refreshValueInput(); cleaningErrorsAfterClosing(popupUserInfo)});


function closePopup(popup){
    popup.classList.add("popup_disabled")
    popup.classList.remove("popup_opened")
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener("mousedown", closeByOutsideClick);
}
export function openPopup(popup){
    popup.classList.add("popup_opened")
    popup.classList.remove("popup_disabled")
    document.addEventListener('keydown', closeByEsc)
    document.addEventListener('mousedown', closeByOutsideClick)

}
function cleaningErrorsAfterClosing(popup){
    const inputElements = popup.querySelectorAll('.popup__input')
    const inputErrorElements = popup.querySelectorAll('.popup__input-error')
    inputErrorElements.forEach((inputErrorElement) => {
        inputErrorElement.textContent = "";
        inputErrorElement.classList.remove(selectors.errorClass);
    });
    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(selectors.inputErrorClass);
    });
}

function closeByOutsideClick(evt) {
    const eventTarget = evt.target;
    if(eventTarget.classList.contains('popup_opened')) {
        closePopup(eventTarget)
    }
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


const popupEditValidation = new FormValidator(selectors, popupUserInfo);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(selectors, popupAddCard);
popupAddValidation.enableValidation();




initialCards.forEach(function (obj) {
    const card = new Card(obj.name, obj.link);
    const cardElement = card.generateCard()
    placesList.appendChild(cardElement);
})



buttonAddCard.addEventListener('click', function () {openPopup(popupAddCard); addCardForm.reset(); cleaningErrorsAfterClosing(popupAddCard)});


function addNewCard(evt) {
    evt.preventDefault();
    const nameF = nameCardForm.value;
    const link = urlCardForm.value;
    const card = new Card(nameF, link);
    const cardElement = card.generateCard()
    placesList.prepend(cardElement);
    addCardForm.reset();
    closePopup(popupAddCard);
}

addCardForm.addEventListener('submit', addNewCard);




