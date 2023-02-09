export default

class Card{
    constructor(item,  cardTemplate, handleCardClick) {
        this._popup = document.querySelector(".popup-image");
        this._imageLink = item.link;
        this._title = item.name;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardTemplate
        this._descriptionImagePopup = this._popup.querySelector('.popup-image__name');
        this._imgElementPopup = this._popup.querySelector('.popup-image__img');
    }

    _setEventListener(){
        this._cardLike.addEventListener('click', ()=> {
            this._likeCard();
        });
        this._cardImage.addEventListener('click', () =>{
            this._handleCardClick(this._title, this._imageLink, this._descriptionImagePopup,  this._imgElementPopup);
        });
        this._card.querySelector('.place-card__delete-icon').addEventListener('click', () => {
            this._deleteCard();
        });
    }

    generateCard(){
        this._card = this._cardTemplate.content.querySelector('.place-card').cloneNode(true);
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
}


