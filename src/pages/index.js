import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import {initialCards} from '../utils/constants.js'
import {validationConfig} from '../utils/constants.js'

const editButton = document.querySelector('.profile__edit-button');
const popupName = document.querySelector('.popup__input_name');
const popupProfession = document.querySelector('.popup__input_profession');
const addButton = document.querySelector('.profile__add-button');
const cardsItems = '#cards__item';
const cardsContainer = '.cards';

const popupImg = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title_open-card');

const popupWithImage = new PopupWithImage('.popup_open-card', popupImg, popupTitle);
const popupEditProfile = new PopupWithForm('.popup_edit-profile', editCallback);
const popupAdd = new PopupWithForm('.popup_add-card', addCallback);
const userInfo = new UserInfo({
  userName: '.profile__name',
  userProfession: '.profile__profession'
});

function editCallback(getInputValues) {
  userInfo.setUserInfo(getInputValues)
  popupEditProfile.close();
}
popupEditProfile.setEventListeners();

function addCallback(inputValues) {
  const newcard = {name: inputValues.place, link: inputValues.placepic}
  createCard(newcard)
  popupAdd.close();
}
popupAdd.setEventListeners();

function createCard(item) {
  const card = new Card(item, cardsItems, popupWithImage)
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item)
  }
},
cardsContainer
);
cardsList.render();

const formProfile = document.querySelector('.popup__form_edit-profile');
const formProfileClass = new FormValidator(validationConfig, formProfile);
formProfileClass.enableValidation();

const formPlace = document.querySelector('.popup__form_new-place');
const formPlaceClass = new FormValidator(validationConfig, formPlace);
formPlaceClass.enableValidation();

addButton.addEventListener('click', () => {
  popupAdd.open();
  formPlaceClass.disableValidation()
});

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  formProfileClass.disableValidation()
  const userInfoData = userInfo.getUserInfo();
  popupName.value = userInfoData.name;
  popupProfession.value = userInfoData.profession;
}); 

