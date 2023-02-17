export default

class Card{
    constructor(dataCard, { userId, handleCardClick, handleDeleteCard, handleLikeCard, handleDeleteLikeCard }, cardTemplate) {
        this._userId = userId;
        this._title = dataCard.name;
        this._imageLink = dataCard.link;
        this._cardId = dataCard._id;
        this._cardOwnerId = dataCard.owner._id;
        this._dataLikes = dataCard.likes;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._handleDeleteLikeCard = handleDeleteLikeCard;

    };
    _setData() {

        this._cardLikeCount = this._card.querySelector('.place-card__like-counter');
        this._cardDeleteButton = this._card.querySelector('.place-card__delete-icon');
        this._cardLikeButton = this._card.querySelector('.place-card__like-icon');
        this._cardImage.src = this._imageLink;
        this._cardImage.alt = this._title;
        this._cardLikeCount.textContent = this._dataLikes.length;

        if (this._cardOwnerId !== this._userId) {
            this._cardDeleteButton.remove();
        }

        if (this._dataLikes.some(item => item._id === this._userId)) {
            this._cardLikeButton.classList.add('place-card__like-icon_activated');
        }
    };


    _setEventListener(){
        this._cardImage.addEventListener('click', () =>{
            this._handleCardClick(this._title, this._imageLink)
        });
        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this._cardId)
        });
        this._cardLikeButton.addEventListener('click', () => {
            if (this._cardLikeButton.classList.contains('place-card__like-icon_activated')) {
                this._handleDeleteLikeCard(this._cardId);
            } else {
                this._handleLikeCard(this._cardId);
            }
        });
    }

    generateCard(){
        this._card = this._cardTemplate.content.querySelector('.place-card').cloneNode(true);
        this._cardImage = this._card.querySelector('.place-card__image');
        this._cardImage.style.backgroundImage = `url(${this._imageLink})`;
        this._card.querySelector('.place-card__name').textContent = this._title;
        this._setData();
        this._setEventListener();
        return this._card;
    }


    changeLike(data) {
        this._cardLikeCount.textContent = data.likes.length;
        this._cardLikeButton.classList.toggle('place-card__like-icon_activated');
    }


    deleteCard(){
        this._card.remove(this._card);
    }
}


