import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
    open (cardTitleElement, cardImageElement) {
        const descriptionImagePopup = this._popup.querySelector('.popup-image__name');
        const imgElementPopup = this._popup.querySelector('.popup-image__img');
        imgElementPopup.src = cardImageElement;
        imgElementPopup.alt = cardTitleElement;
        descriptionImagePopup.textContent = cardTitleElement;
        super.open();
    }
}