const buttonUserInfo = document.querySelector(".user-info__edit");
const popupUserInfo = document.querySelector(".popup-edit-profile");


const formElement = popupUserInfo.querySelector(".popup__form")

const namePage = document.querySelector(".user-info__name")
const jobPage = document.querySelector(".user-info__job")

const nameInput = formElement.querySelector(".popup__input_type_name")
const jobInput = formElement.querySelector(".popup__input_type_info")

function refreshValueInput(){
    nameInput.value = namePage.textContent
    jobInput.value = jobPage.textContent
}


    function handleFormSubmit (evt) {
        evt.preventDefault();
        namePage.textContent = nameInput.value
        jobPage.textContent = jobInput.value
        closePopup(popupUserInfo)
    }

formElement.addEventListener('submit', handleFormSubmit);


const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup( popup));
});
buttonUserInfo.addEventListener('click', function () {openPopup(popupUserInfo); refreshValueInput()});


function closePopup(popup){
    popup.classList.add("popup_disabled")
    popup.classList.remove("popup_opened")
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener("mousedown", closeByOutsideClick);
    console.log()
}
function openPopup(popup){
    popup.classList.add("popup_opened")
    popup.classList.remove("popup_disabled")
    document.addEventListener('keydown', closeByEsc)
    document.addEventListener('mousedown', closeByOutsideClick)
    cleaningErrorsAfterClosing(popup)
}
function cleaningErrorsAfterClosing(popup){
    const inputElements = popup.querySelectorAll('.popup__input')
    const inputErrorElements = popup.querySelectorAll('.popup__input-error')
    inputErrorElements.forEach((inputErrorElement) => {
        inputErrorElement.textContent = "";
        inputErrorElement.classList.remove(elements.errorClass);
    });
    inputElements.forEach((inputElement) => {
        inputElement.classList.remove(elements.inputErrorClass);
    });
}

function closeByOutsideClick(evt) {
    const eventTarget = evt.target;
    const openedPopup = document.querySelector('.popup_opened');
    if(eventTarget.classList.contains('popup_opened')) {
        closePopup(openedPopup)
    }
}

function closeByEsc(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
}



