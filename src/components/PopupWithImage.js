import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._descriptionImagePopup= this._popup.querySelector(".popup-image__name");
        this._imgElementPopup = this._popup.querySelector('.popup-image__img');
    };
    open (cardTitleElement, cardImageElement) {
        this._imgElementPopup.src = cardImageElement;
        this._imgElementPopup.alt = cardTitleElement;
        this._descriptionImagePopup.textContent = cardTitleElement;
        super.open();
    }
}