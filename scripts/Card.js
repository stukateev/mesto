import {openPopup, popupImage, popupImageImg, popupImageName} from "./index.js";
export default

class Card{
    constructor(title, imageLink) {
        this._imageLink = imageLink;
        this._title = title;

    }

    _setEventListener(){
        this._cardLike.addEventListener('click', ()=> {
            this._likeCard();
        });
        this._cardImage.addEventListener('click', () =>{
            this._openCardPopup();
        });
        this._card.querySelector('.place-card__delete-icon').addEventListener('click', () => {
            this._deleteCard();
        });



    }

    generateCard(){

        this._card = document.querySelector('#place-card-template').content.querySelector('.place-card').cloneNode(true);
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardLike = this._card.querySelector('.place-card__like-icon');

        this._cardImage.style.backgroundImage = `url(${this._imageLink})`;
        this._card.querySelector('.place-card__name').textContent = this._title;
        this._setEventListener();
        return this._card;
    }
    _likeCard(){
        this._cardLike.classList.toggle('place-card__like-icon_activated');
    }
    _deleteCard(){
        this._card.remove(this._card);
        this._card = null;
    }
    _openCardPopup(){
        openPopup(popupImage);
        const styleLink = this._cardImage.getAttribute('style').slice(23,-3);
        const selectCard = this._cardImage.closest('.place-card').querySelector(".place-card__name").textContent;
        popupImageImg.src = styleLink;
        popupImageImg.alt = selectCard
        popupImageName.textContent = selectCard;
    }
}


