import Card from '../scripts/Card.js'
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const saveButtonCards = document.querySelector('.popup__button_add-card');
const popupName = document.querySelector('.popup__item_name');
const popupProfession = document.querySelector('.popup__item_profession');
const popupNameValue = popupName.querySelector('input');
const popupProfessionValue = popupProfession.querySelector('input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_add-card');
const nameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_place-pic'); 
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardsItems = '#cards__item';
const cardsContainer = document.querySelector('.cards');

export const popupCardOpen = document.querySelector('.popup_open-card');
export const popupImg = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title_open-card');



export function openPopup(popup) {
  document.addEventListener('keydown', handleEscClose);
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscClose);
  popup.classList.remove('popup_opened');
};

popupCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  const newCard = { name: nameValue, link: linkValue };

  nameInput.value = '';
  linkInput.value = '';

  addCard(newCard);
  closePopup(popupCard);

  saveButtonCards.classList.add('popup__button_disabled');
  saveButtonCards.disabled = true;
}); 

// добавляет карты из массива на страницу
(function processInitialCards() {
  initialCards.forEach(function (item) {
    const cards = new Card(item, cardsItems);
    cardsContainer.append(cards.generateCard());
  });
})();

function addCard(cardData) {
  const newCard = new Card(cardData, cardsItems);
  cardsContainer.prepend(newCard.generateCard());
};

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

addButton.addEventListener('click', () => {
  openPopup(popupCard);
});

popupEditProfile.addEventListener('click', handleOverlayClick);
popupCard.addEventListener('click', handleOverlayClick);
popupCardOpen.addEventListener('click', handleOverlayClick);

editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  popupNameValue.value = profileName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
}); 

popupEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = popupNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closePopup(popupEditProfile);
}); 

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  // Добавляем обработчик события для кнопки закрытия попапа
  button.addEventListener('click', function() {
    closePopup(popup);
  });
});

import FormValidator from '../scripts/FormValidator.js'