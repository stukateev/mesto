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
const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true);


function createMarkup(citiName, linkToPic) {
    placeCardElement.querySelector(".place-card__name").textContent = citiName;
    placeCardElement.querySelector(".place-card__image").style.backgroundImage = `url(${linkToPic})`;
    return placeCardElement;
}

window.addEventListener('load', function () {
    initialCards.forEach(function (obj) {
        placesList.appendChild(createMarkup(obj.name, obj.link));
    })
})

const buttonAddCard = document.querySelector(".user-info__button");
const popupAddCard = document.querySelector(".popup-add-card");


const addCardForm = popupAddCard.querySelector(".popup__form");
const nameCardForm = addCardForm.querySelector(".popup__input_type_name");
const urlCardForm = addCardForm.querySelector(".popup__input_type_url");

buttonAddCard.addEventListener('click', function () {openPopup(popupAddCard)});


function addNewCard(evt) {
    evt.preventDefault();
    const nameF = nameCardForm.value;
    const link = urlCardForm.value;
    placesList.prepend(createMarkup(nameF, link));
    closePopup(popupAddCard);
    addCardForm.reset();
}

addCardForm.addEventListener('submit', addNewCard);