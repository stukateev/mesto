const hasInvalidInput = (inputList) => {
    return inputList.some((item) => {
        return !item.validity.valid;
    });
};

const showInputError = (formElement, inputElement, errorMessage, elements) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(elements.inputErrorClass);
    errorElement.classList.add(elements.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, elements) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(elements.inputErrorClass);
    errorElement.classList.remove(elements.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, elements) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, elements);
    } else {
        hideInputError(formElement, inputElement, elements);
    }
};

const disableButton = (buttonElement, elements) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(elements.inactiveButtonClass);
}
const enableButton = (buttonElement, elements) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(elements.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, elements) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, elements);
    } else {
        enableButton(buttonElement, elements);
    }
};

const setEventListeners = (formElement, elements) => {
    const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
    const buttonElement = formElement.querySelector(elements.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, elements);


    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, elements);
        }, 0);
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, elements);
            toggleButtonState(inputList, buttonElement, elements);
        });
    });
};

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(selectors)