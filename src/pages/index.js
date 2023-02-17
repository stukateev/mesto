import './index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api";
import {
    addCardForm,
    avatarInput,
    avatarPage,
    buttonAddCard,
    buttonChangePhoto,
    buttonUserInfo,
    jobInput,
    jobPage,
    nameInput,
    namePage,
    placesList,
    popupUserInfo,
    cardTemplate,
    selectors, avatarForm
} from "../utils/constants"


const profileField = {
    nameField: namePage,
    jobField: jobPage,
    avatarField: avatarPage
}

const userInfo = new UserInfo(profileField);


const popupEditValidation = new FormValidator(selectors, popupUserInfo);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidator(selectors, addCardForm);
popupAddValidation.enableValidation();

const popupAvatarValidation = new FormValidator(selectors, avatarForm);
popupAvatarValidation.enableValidation();


function createCard(item) {
    const card = new Card(
        item,
        {
            userId: userInfo.getUserId(),
            handleCardClick: () => {
                popupWithImage.open(item.name, item.link);
            },
            handleDeleteCard: (cardId) => {
                popupDelete.open();
                popupDelete.submit(() => {
                    api.deleteCard(cardId)
                        .then(() => {
                            card.deleteCard();
                            popupDelete.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
            },
            handleLikeCard: (cardId) => {
                api.likeCard(cardId)
                    .then((data) => {
                        card.changeLike(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },

            handleDeleteLikeCard: (cardId) => {
                api.handleDeleteLikeCard(cardId)
                    .then((data) => {
                        card.changeLike(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },  cardTemplate);

    return card.generateCard();
}


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: 'c5e343df-9176-4cc9-91aa-42e4c35689ac',
        'Content-Type': 'application/json'
    }
});


Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, initialCards]) => {
        userInfo.setUserInfo(user);
        cardSection.renderItems(initialCards.reverse());
    })
    .catch((err) => {
        console.log(err);
    })


const cardSection = new Section({
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    }
}, placesList)


const popupAddCard = new PopupWithForm({
    handleFormSubmit: (formData) => {
        popupAddCard.renderLoading(true);
        api.createCard(formData)
            .then((data) => {
                cardSection.addItem(createCard(data));
                popupAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddCard.renderLoading(false);
            })
    }
}, '.popup-add-card');

const popupWithImage = new PopupWithImage('.popup-image')

const popupEditProfile = new PopupWithForm({
    handleFormSubmit: (formData) => {
        popupEditProfile.renderLoading(true);
        api.editProfile(formData)
            .then((data) => {
                userInfo.setUserInfo(data);
                popupEditProfile.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfile.renderLoading(false);
            })
    }
}, '.popup-edit-profile')

const popupAvatar = new PopupWithForm({
    handleFormSubmit: (data) => {
        popupAvatar.renderLoading(true);
        api.changeAvatar(data)
            .then((data) => {
                userInfo.setUserInfo(data);
                popupAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAvatar.renderLoading(false);
            })
    }
}, '.popup-avatar');

const popupDelete = new PopupDelete('.popup-delete');

buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    popupAddValidation.resetValidation()
});

buttonUserInfo.addEventListener('click', () => {
    popupEditProfile.open();
    const inputValues = userInfo.getUserInfo();
    nameInput.value = inputValues.name;
    jobInput.value = inputValues.job;
    popupEditValidation.resetValidation()
});

buttonChangePhoto.addEventListener('click', () => {
    popupAvatar.open();
    const inputValues = userInfo.getUserInfo();
    avatarInput.value = inputValues.avatar;
    popupAvatarValidation.resetValidation()
});

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAvatar.setEventListeners()
popupDelete.setEventListener();



