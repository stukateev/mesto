export default class FormValidator {
    constructor(selectors, formElement) {
        this._formElement = formElement;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
    }


    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }


    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }


    disableSubmitButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }


    enableSubmitButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}


