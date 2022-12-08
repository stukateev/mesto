const popupImage = document.querySelector(".popup-image");
let buttonClosePopupImage = popupImage.querySelector(".popup-image__close");

placesList.addEventListener('click', function (event) {

    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_activated');

    } else if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card'));

    } else if (event.target.classList.contains('place-card__image')) {
        popupImage.classList.remove("popup-image_disabled");
        const styleLink = event.target.getAttribute('style').slice(23,-3);
        let selectCard = event.target.parentNode.querySelector('.place-card__name').textContent;
        let popupImageImg = document.querySelector(".popup-image__img")
        popupImageImg.src = styleLink;
        popupImageImg.alt = selectCard
        document.querySelector(".popup-image__name").textContent = selectCard;

    }
});

function closePopupImage(){
    popupImage.classList.add("popup-image_disabled")
}
buttonClosePopupImage.addEventListener('click', closePopupImage);
