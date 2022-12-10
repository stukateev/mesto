const popupImage = document.querySelector(".popup-image");
const popupImageImg = popupImage.querySelector(".popup-image__img")
const popupImageName = popupImage.querySelector(".popup-image__name")

placesList.addEventListener('click', function (event) {

    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_activated');

    } else if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card'));

    } else if (event.target.classList.contains('place-card__image')) {
        openPopup(popupImage);
        const styleLink = event.target.getAttribute('style').slice(23,-3);
        const selectCard = event.target.closest('.place-card').querySelector(".place-card__name").textContent;

        popupImageImg.src = styleLink;
        popupImageImg.alt = selectCard
        popupImageName.textContent = selectCard;
    }
});


