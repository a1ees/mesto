import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import initialCards from '../utils/constants.js'

const editButton = document.querySelector('.profile__edit-button');
const popupName = document.querySelector('.popup__input_name');
const popupProfession = document.querySelector('.popup__input_profession');
const addButton = document.querySelector('.profile__add-button');
const cardsItems = '#cards__item';
const cardsContainer = '.cards';

export const closeButtons = document.querySelectorAll('.popup__close-button');
export const popupImg = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title_open-card');

export const popupWithImage = new PopupWithImage('.popup_open-card');
const popupEditProfile = new PopupWithForm('.popup_edit-profile', editCallback);
const popupAdd = new PopupWithForm('.popup_add-card', addCallback);
const userInfo = new UserInfo({
  userName: '.profile__name',
  userProfession: '.profile__profession'
});

function editCallback() {
  userInfo.setUserInfo(popupName, popupProfession)
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
  const card = new Card(item, cardsItems)
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

addButton.addEventListener('click', () => {
  popupAdd.open();
});

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();
  popupName.value = userInfoData.name;
  popupProfession.value = userInfoData.profession;
}); 

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
};

const formProfile = document.querySelector('.popup__form_edit-profile');
const formProfileClass = new FormValidator(validationConfig, formProfile);
formProfileClass.enableValidation();

const formPlace = document.querySelector('.popup__form_new-place');
const formPlaceClass = new FormValidator(validationConfig, formPlace);
formPlaceClass.enableValidation();