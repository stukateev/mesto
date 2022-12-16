const buttonUserInfo = document.querySelector(".user-info__edit");
const popupUserInfo = document.querySelector(".popup-edit-profile");

const profileForm = document.forms["profile-form"];


const namePage = document.querySelector(".user-info__name")
const jobPage = document.querySelector(".user-info__job")

const nameInput = profileForm.elements["nameX"]
const jobInput = profileForm.elements["info"]

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


const closeButtons = document.querySelectorAll('.popup__close');
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
function openPopup(popup){
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
const placesList = document.querySelector('.places-list');
const placeCardTemplate = document.querySelector('#place-card-template').content;
const placeCardElement = placeCardTemplate.querySelector('.place-card')

function createMarkup(name, link) {
    const placeCardElementClone = placeCardElement.cloneNode(true);
    placeCardElementClone.querySelector(".place-card__name").textContent = name;
    placeCardElementClone.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
    return placeCardElementClone;
}

window.addEventListener('load', function () {
    initialCards.forEach(function (obj) {
        placesList.appendChild(createMarkup(obj.name, obj.link));
    })
})

const buttonAddCard = document.querySelector(".user-info__button");
const popupAddCard = document.querySelector(".popup-add-card");

const addCardForm = document.forms["add-card-form"];
const nameCardForm = addCardForm.elements["name"];
const urlCardForm = addCardForm.elements["link"];


buttonAddCard.addEventListener('click', function () {openPopup(popupAddCard); addCardForm.reset(); cleaningErrorsAfterClosing(popupAddCard)});


function addNewCard(evt) {
    evt.preventDefault();
    const nameF = nameCardForm.value;
    const link = urlCardForm.value;
    placesList.prepend(createMarkup(nameF, link));
    addCardForm.reset();
}

addCardForm.addEventListener('submit', addNewCard);

const popupImage = document.querySelector(".popup-image");
const popupImageImg = popupImage.querySelector(".popup-image__img")
const popupImageName = popupImage.querySelector(".popup-image__name")

placesList.addEventListener('click', function (event) {

    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_activated');

    } else if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card'));

    } else if (event.target.classList.contains('place-card__image')) {
        openPopup(popupImage);
        const styleLink = event.target.getAttribute('style').slice(23,-3);
        const selectCard = event.target.closest('.place-card').querySelector(".place-card__name").textContent;

        popupImageImg.src = styleLink;
        popupImageImg.alt = selectCard
        popupImageName.textContent = selectCard;
    }
});



