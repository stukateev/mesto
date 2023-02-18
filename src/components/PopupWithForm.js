import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__button');
        this._submitButtonText = this._submitButton.textContent;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    };

    close() {
        this._popupForm.reset();
        super.close();
    };

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранить...';

        } else {
            this._submitButton.textContent = this._submitButtonText;

        }
    }
}