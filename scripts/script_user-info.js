const buttonUserInfo = document.querySelector(".user-info__edit");
const popupUserInfo = document.querySelector(".popup-edit-profile");

const formElement = popupUserInfo.querySelector(".popup__form")

const namePage = document.querySelector(".user-info__name")
const jobPage = document.querySelector(".user-info__job")

const nameInput = formElement.querySelector(".popup__input_type_name")// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_info")// Воспользуйтесь инструментом .querySelector()

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

function closePopup(popup){
    popup.classList.add("popup_disabled")
}
function openPopup(popup){
    popup.classList.remove("popup_disabled")
}
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
buttonUserInfo.addEventListener('click', function () {openPopup(popupUserInfo); refreshValueInput()});


