import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupDelete from '../components/PopupDelete'
import PopupWithForm from '../components/PopupWithForm.js'
import { validationConfig, cardsItems, cardsContainer } from '../utils/constants.js'
import Api from '../components/Api.js'

const avatarButton = document.querySelector('.profile__avatar-container')
const editButton = document.querySelector('.profile__edit-button');
const popupName = document.querySelector('.popup__input_name');
const popupProfession = document.querySelector('.popup__input_profession');
const addButton = document.querySelector('.profile__add-button');


let userId;
let cardsList;
const popupImg = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title_open-card');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '0cb664d7-98e3-4fc4-9df8-958b23efa54d',
    'Content-Type': 'application/json'
  }
})

const popupCardDelete = new PopupDelete('.popup_delete-card', api);
const popupWithImage = new PopupWithImage('.popup_open-card', popupImg, popupTitle);
const popupEditProfile = new PopupWithForm('.popup_edit-profile', editCallback);
const popupAdd = new PopupWithForm('.popup_add-card', addCallback);
const popupAvatar = new PopupWithForm('.popup_edit-avatar', avatarCallback);


const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__profession',
  avatar: '.profile__avatar'
});


Promise.all([api.getUserInfo(), api.getCardsItem()])
    .then(([userData, cardData]) => {
      userId = userData._id;
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);

      cardsList = new Section({
        items: cardData.reverse(), 
        renderer: (item) => {
          cardsList.addCard(createCard(item))
        }
      }, cardsContainer);
      cardsList.render();
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });




    function avatarCallback(getInputValues) {
      this.submitButton.textContent = 'Сохранение...';
      api.sendAvatar(getInputValues)
        .then(() => {
          userInfo.setUserAvatar(getInputValues);
          popupAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitButton.textContent = 'Да';
        });
    }

function editCallback(getInputValues) {
  this.submitButton.textContent = 'Сохранение...';
  api.sendUserInfo(getInputValues)
  .then(() => {
    userInfo.setUserInfo(getInputValues)
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    this.submitButton.textContent = 'Сохранить';
  });
}

function addCallback(inputValues) {
  this.submitButton.textContent = 'Сохранение...';

  api.sendCard({ name: inputValues.place, link: inputValues.placepic })
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardsList.addCard(newCard);
      popupAdd.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.submitButton.textContent = 'Сохранить';
    });
}

popupEditProfile.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupCardDelete.setEventListeners();

function createCard(item) {
  const card = new Card(item, cardsItems, popupWithImage, popupCardDelete, api, userId);
  return card.generateCard();
  }

const formProfile = document.querySelector('.popup__form_edit-profile');
const formProfileClass = new FormValidator(validationConfig, formProfile);
formProfileClass.enableValidation();

const formPlace = document.querySelector('.popup__form_new-place');
const formPlaceClass = new FormValidator(validationConfig, formPlace);
formPlaceClass.enableValidation();

const formAvatar = document.querySelector('.popup__form_edit-avatar');
const formAvatarClass = new FormValidator(validationConfig, formAvatar);
formAvatarClass.enableValidation();

avatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarClass.disableValidation()
});

addButton.addEventListener('click', () => {
  popupAdd.open();
  formPlaceClass.disableValidation()
});

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  formProfileClass.disableValidation()
  const userInfoData = userInfo.getUserInfo();
  popupName.value = userInfoData.name;
  popupProfession.value = userInfoData.about;
}); 
