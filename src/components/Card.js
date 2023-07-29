export default class Card {
  constructor(data, templateSelector, handleCardClick, popupDelete, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._sumLike = data.likes;
    this._owner = data.owner._id;
    this._dataId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._popupDelete = popupDelete;
    this._api = api;
    this._userId = userId;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);
  }

  //добавили иконку удаления карточки при перезагрузке страницы, по id
  _buttonDeleteAdd() {
    this._buttonDelete.classList.add('cards__remove-btn_active')
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.cards__image');
    this._cardTitle = this._cardElement.querySelector('.cards__title');
    this._like = this._cardElement.querySelector('.cards__like-sum');
    this._like.textContent = this._sumLike.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._buttonDelete = this._cardElement.querySelector('.cards__remove-btn');
    this._buttonLike = this._cardElement.querySelector('.cards__btn')
    if(this._owner === this._userId) {
      this._buttonDeleteAdd()
    }
    this._searchLike();
    this._setEventListeners();
    return this._cardElement;
  }
  
  _handleCardDelete() {
    this._popupDelete.open(this._cardElement, this._dataId);
  }

  //помогает узнать есть ли лайк от конкретного пользователя у карточки, если есть - добавляет иконку лайка
  _searchLike() {
    this._sumLike.forEach((item) => {
      if(item._id === this._userId) {
        this._buttonLike.classList.add('cards__btn_active');
      }
      else {
        this._buttonLike.classList.remove('cards__btn_active');
      }
    })
  }

  _handleCardLike() {
    if (!this._buttonLike.classList.contains('cards__btn_active')) {
      this._api.sendLike(this._dataId)
        .then(updatedCard => {
          // Обновляем состояние карточки на основе данных из ответа сервера
          this._sumLike = updatedCard.likes;
          this._like.textContent = this._sumLike.length;
          this._searchLike();
        })
        .catch(error => {
          console.error('Ошибка при постановке лайка:', error);
        });
    }
    else {
      this._removeCradLike()
    }
  }
  
    _removeCradLike() {
      this._api.deleteLike(this._dataId)
      .then(updatedCard => {
        this._sumLike = updatedCard.likes;
          this._like.textContent = this._sumLike.length;
          this._searchLike();
          this._buttonLike.classList.remove('cards__btn_active');
      })
      .catch((err) => {
        console.log(err);
      }); 
    }


  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    })
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick.open(this._link, this._name);
    })
  }
}
