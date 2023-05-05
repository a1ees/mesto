let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__button');
let popupName = document.querySelector('.popup__item_name');
let popupProfession = document.querySelector('.popup__item_profession');
let popupNameValue = popupName.querySelector('input');
let popupProfessionValue = popupProfession.querySelector('input');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupNameValue.value = profileName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
}); 

saveButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  profileName.textContent = popupNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  popup.classList.remove('popup_opened');
}); 

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
}); 


 

















