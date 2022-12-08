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


function createMarkup(citiName, linkToPic) {
    const placeCardTemplate = document.querySelector('#place-card-template').content;
    const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true);
    placeCardElement.querySelector(".place-card__name").textContent = citiName;
    placeCardElement.querySelector(".place-card__image").style.backgroundImage = `url(${linkToPic})`;

    return placeCardElement;
}



window.addEventListener('load', function () {
    initialCards.forEach(function (obj) {
        placesList.appendChild(createMarkup(obj.name, obj.link));
    })
})

let buttonAddCard = document.querySelector(".user-info__button");
let popupAddCard = document.querySelector(".popup-add-card");
let closeTabAddCard = popupAddCard.querySelector(".popup__close");
function openAddCard(){
    popupAddCard.classList.remove("popup_disabled")
}


function closeAddCard(){
    popupAddCard.classList.add("popup_disabled")
}

let addCardForm = popupAddCard.querySelector(".popup__form");
let nameCardForm = addCardForm.querySelector(".popup__input_type_name");
let urlCardForm = addCardForm.querySelector(".popup__input_type_url");

buttonAddCard.addEventListener('click', openAddCard);
closeTabAddCard.addEventListener('click', closeAddCard);

function addNewCard(evt) {
    evt.preventDefault();
    let nameF = nameCardForm.value;
    let link = urlCardForm.value;
    placesList.prepend(createMarkup(nameF, link));
    closeAddCard();
    addCardForm.reset();
}

addCardForm.addEventListener('submit', addNewCard);