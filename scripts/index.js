const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const saveButton = document.querySelector('.popup__button');
const saveButtonCards = document.querySelector('.popup__button_add-card');
const popupName = document.querySelector('.popup__item_name');
const popupProfession = document.querySelector('.popup__item_profession');
const popupNameValue = popupName.querySelector('input');
const popupProfessionValue = popupProfession.querySelector('input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_add-card');
const nameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_place-pic'); 
const closeButtonAddCard = document.querySelector('.popup__close-button_add-card');


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

closeButton.addEventListener('click', function () {
  popupCards.classList.remove('popup_opened');
}); 



//Массив, содержащий имя и фото карточек 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// получили темплейт элемент и кинули его в констатну
const cardsItem = document.querySelector('#cards__item').content;

// получили блок, к которому будем добавлять темплейт элемент с значениями
const cardsTemplate = document.querySelector('.cards');


// сделали функцию добавления карточек на страницу
function processInitialCards() {
  // сделали функцию, перебирающую массив с названием и фото карточек
  initialCards.forEach(function (item) {
  // массив будет клонироваться на каждой итерации в константу
  const cardsElement = cardsItem.querySelector('.cards__item').cloneNode(true);
  // будем получать значения классов с картинками и заголовками на каждой итерации
  const cardsImage = cardsElement.querySelector('.cards__image');
  const cardsTitle = cardsElement.querySelector('.cards__title');
  // ссылка на картинку = элементМассива.сЗначениемLink
  cardsImage.src = item.link;
  cardsTitle.textContent = item.name;
  // в конце функции мы добавляем клон массива к секции cards в html
  cardsTemplate.append(cardsElement)
});
};



function addFirstCard() {
  const firstCard = initialCards[0]; // Получаем первую карточку
  const cardsElement = cardsItem.querySelector('.cards__item').cloneNode(true);
  const cardsImage = cardsElement.querySelector('.cards__image');
  const cardsTitle = cardsElement.querySelector('.cards__title');
  
  cardsImage.src = firstCard.link;
  cardsTitle.textContent = firstCard.name;
  
  cardsTemplate.prepend(cardsElement); // Используем prepend для добавления карточки в начало списка
}


processInitialCards();


addButton.addEventListener('click', function() {
  popupCards.classList.add('popup_opened');
});


saveButtonCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  if (nameValue && linkValue) {
    const newCard = { name: nameValue, link: linkValue };
    initialCards.unshift(newCard);
    nameInput.value = '';
    linkInput.value = '';
    addFirstCard();
  }
  popupCards.classList.remove('popup_opened');
  console.log(initialCards)
}); 


closeButtonAddCard.addEventListener('click', function () {
  popupCards.classList.remove('popup_opened');
}); 


cardsTemplate.addEventListener('click', function(event) {
  if (event.target.classList.contains('cards__btn')) {
    const like = event.target;
    const isActive = like.classList.contains('cards__btn_active');
    if (!isActive) {
      like.classList.add('cards__btn_active');
    } else {
      like.classList.remove('cards__btn_active');
    }
  }
});

// делегировали события, при клике на любую из карточек js будет определять, произошел ли клик на кнопку удаления.
cardsTemplate.addEventListener('click', function(event) {
  //содержит ли элемент, на котором произошло событие клика, класс 'cards__remove-btn'
  if (event.target.classList.contains('cards__remove-btn')) {
    const cardItem = event.target.closest('.cards__item');
    cardItem.remove();
  }
});

// получили темплейт элемент и кинули его в констатну
const cardsPopupItem = document.querySelector('#popup-cards__container').content;

// получили блок, к которому будем добавлять темплейт элемент с значениями
const cardsTemplatePopup = document.querySelector('.popup-cards');

cardsTemplate.addEventListener('click', function(event) {
  if (event.target.classList.contains('cards__image')) {
    const cardImg = event.target.closest('.cards__image').src;
    const cardItem = event.target.closest('.cards__item');
    const cardTitle = cardItem.querySelector('.cards__title').textContent;
    cardsTemplatePopup.classList.add('popup-cards_opened');
    const cardsPopupElement = cardsPopupItem.querySelector('.popup-cards__container').cloneNode(true);
    const cardsPopupImage = cardsPopupElement.querySelector('.popup-cards__image');
    const cardsPopupTitle = cardsPopupElement.querySelector('.popup-cards__title');
    
    cardsPopupImage.src = cardImg;
    cardsPopupTitle.textContent = cardTitle;
    cardsTemplatePopup.append(cardsPopupElement)
  }
  const cardsContainer = document.querySelector('.popup-cards__container');
  const closeButtonPopupCard = document.querySelector('.popup-cards__close-btn');
  closeButtonPopupCard.addEventListener('click', function () {
  cardsTemplatePopup.classList.remove('popup-cards_opened');
  cardsContainer.remove();
}); 
});

















