import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {

    open (cardTitleElement, cardImageElement, descriptionImagePopup, imgElementPopup) {
        imgElementPopup.src = cardImageElement;
        imgElementPopup.alt = cardTitleElement;
        descriptionImagePopup.textContent = cardTitleElement;
        super.open();
    }
}