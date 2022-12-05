let buttonUserInfo = document.querySelector(".user-info__edit");
let popupUserInfo = document.querySelector(".popup-edit-profile");
let closeTabUserInfo = document.querySelector(".popup-edit-profile__close");
function openChangeUserInfo(){
    refreshValueInput()
    popupUserInfo.classList.remove("popup-edit-profile_disabled")
}





let formElement = document.querySelector(".popup-edit-profile__form")// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let namePage = document.querySelector(".user-info__name")
let jobPage = document.querySelector(".user-info__job")


let nameInput = formElement.querySelector(".popup-edit-profile__input_type_name")// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup-edit-profile__input_type_info")// Воспользуйтесь инструментом .querySelector()

function refreshValueInput(){
    nameInput.value = namePage.textContent
    jobInput.value = jobPage.textContent
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function handleFormSubmit (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.
        namePage.textContent = nameInput.value
        jobPage.textContent = jobInput.value
        // Получите значение полей jobInput и nameInput из свойства value
        closeChangeUserInfo()
        // Выберите элементы, куда должны быть вставлены значения полей

        // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function closeChangeUserInfo(){
    popupUserInfo.classList.add("popup-edit-profile_disabled")
}

buttonUserInfo.addEventListener('click', openChangeUserInfo, refreshValueInput);
closeTabUserInfo.addEventListener('click', closeChangeUserInfo);

