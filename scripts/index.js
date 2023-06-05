const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const saveButtonCards = document.querySelector('.popup__button_add-card');
const popupName = document.querySelector('.popup__item_name');
const popupProfession = document.querySelector('.popup__item_profession');
const popupNameValue = popupName.querySelector('input');
const popupProfessionValue = popupProfession.querySelector('input');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_add-card');
const popupCardOpen = document.querySelector('.popup_open-card');
const nameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_place-pic'); 
const closeButtonAddCard = document.querySelector('.popup__close-button_add-card');
const closeButtonOpenCard = document.querySelector('.popup__close-button_open-card');


function openPopup(popup) {
  // Добавили слушатель при открытии попапа
  document.addEventListener('keydown', handleEscClose);
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscClose);
  popup.classList.remove('popup_opened');
};

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

// получили темплейт элемент и кинули его в констатну
const cardsItem = document.querySelector('#cards__item').content;

// получили блок, к которому будем добавлять темплейт элемент с значениями
const cardsContainer = document.querySelector('.cards');

// Объявление функции createCard, которая принимает объект cardData в качестве аргумента. Этот объект содержит данные карточки.
// берет данные карточки, создает новый элемент карточки на основе шаблона, заполняет его данными и возвращает созданный элемент.
function createCard(cardData) {
  //Получили элемент шаблона карточки из DOM и клонировали с сохранением результата в cardsElement
  const cardsElement = cardsItem.querySelector('.cards__item').cloneNode(true);
  const cardsImage = cardsElement.querySelector('.cards__image');
  const cardsTitle = cardsElement.querySelector('.cards__title');
  
  cardsImage.src = cardData.link;
  cardsImage.alt = cardData.name;
  cardsTitle.textContent = cardData.name;
  
  return cardsElement;
};

//функция добавления карточек на страницу с массива initialCards
function processInitialCards() {
  // перебираем массив
  initialCards.forEach(function (item) {
    //создаем новую карточку и помещаем её в константу newCard, создание происходит на каждой итерации
    const newCard = createCard(item);
    //добавляем созданные карточки в контейнер
    cardsContainer.append(newCard);
  });
};

processInitialCards();

// функция добавления новых карточек
function addCard(cardData) {
  //создали новую карточку. Результат создания новой карточки сохраняется в переменную newCard.
  const newCard = createCard(cardData);
  //добавили карточку в начало cardsContainer
  cardsContainer.prepend(newCard);
};

addButton.addEventListener('click', function() {
  openPopup(popupCard);
});

popupCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const linkValue = linkInput.value;
  const newCard = { name: nameValue, link: linkValue };

  nameInput.value = '';
  linkInput.value = '';

  addCard(newCard);
  closePopup(popupCard);
}); 

cardsContainer.addEventListener('click', function(event) {
  // делегировали события, при клике на любую из карточек js будет определять, произошел ли клик на лайк.
  if (event.target.classList.contains('cards__btn')) {
    const like = event.target;
    like.classList.toggle('cards__btn_active');
  };

  // делегировали события, при клике на любую из карточек js будет определять, произошел ли клик на кнопку удаления.
  if (event.target.classList.contains('cards__remove-btn')) {
    const cardItem = event.target.closest('.cards__item');
    cardItem.remove();
  };
  // делегировали события, при клике на любую из карточек js будет определять, произошел ли клик на картинку.
  if (event.target.classList.contains('cards__image')) {
    const cardItem = event.target.closest('.cards__item');
    const cardImg = cardItem.querySelector('.cards__image').src;
    const cardTitle = cardItem.querySelector('.cards__title').textContent;

    const popupImg = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__title_open-card');

    popupImg.src = cardImg;
    popupTitle.textContent = cardTitle;

    openPopup(popupCardOpen);
  };
});

// Функция для закрытия попапа при нажатии на Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция для закрытия попапа при клике на оверлей
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Добавляем обработчики событий для каждого попапа
popupEditProfile.addEventListener('click', handleOverlayClick);
popupCard.addEventListener('click', handleOverlayClick);
popupCardOpen.addEventListener('click', handleOverlayClick);
а 
// Добавляем обработчик события для кнопки закрытия попапа
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  });
});

























