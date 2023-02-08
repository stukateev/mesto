export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
        this._closeByOutsideClick = this._closeByOutsideClick.bind(this)
    };

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
    _closeByOutsideClick = (evt) => {
        const eventTarget = evt.target;
        if(eventTarget.classList.contains('popup_opened')) {
            this.close();
        }
    }
    open() {
        this._popup.classList.add('popup_opened');
        this._popup.classList.remove('popup_disabled');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._closeByOutsideClick);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.classList.add('popup_disabled');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._closeByOutsideClick);
    };

    setEventListeners() {
        const popupCloseButton = this._popup.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {this.close()});
    };
}