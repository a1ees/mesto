 // Функция для показа ошибки валидации
 const showInputError = (formElement, inputElement, errorMessage) => {
  
  // Нашли span ошибку конкретного input в форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Добавили инпуту класс стилизации поля с ошибкой
  inputElement.classList.add('popup__input_type-error');

  // Поместили текст ошибки в span
  errorElement.textContent = errorMessage;

  // Добавили класс, чтобы span был виден
  errorElement.classList.add('popup__input-error_visible');
};

// Функция для скрытия ошибки валидации
const hideInputError = (formElement, inputElement) => {

  // Нашли span ошибку конкретного input в форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Удалили инпуту класс стилизации поля с ошибкой
  inputElement.classList.remove('popup__input_type-error');

  // Удалили класс, чтобы скрыть span
  errorElement.classList.remove('popup__input-error_visible');

  // Удалили текст ошибки в span
  errorElement.textContent = '';
};

// Функция для проверки наличия невалидных полей ввода
const hasInvalidInput = (inputList) => {

   // Используем метод массива some() для проверки каждого элемента массива
  return inputList.some((inputElement) => {

    // Возвращаем true, если хотя бы одно поле ввода невалидно
    return !inputElement.validity.valid;
  });
};

// Функция для изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {

  // Если поле невалидно(в условее помещается true), мы добавляем деактивирующий класс к кнопке и отключаем её на странице
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
    // В ином случае - включаем кнопку
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
};

// Функция для проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement) => {

   // Если поле ввода невалидно (не удовлетворяет условию inputElement.validity.valid)
  if (!inputElement.validity.valid) {

    // Вызываем функцию showInputError для показа сообщения об ошибке
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {

     // Вызываем функцию hideInputError для скрытия сообщения об ошибке
    hideInputError(formElement, inputElement);
  }
};

// Функция для добавления обработчиков событий на поля ввода формы
const setEventListeners = (formElement) => {

   // Получаем список элементов ввода
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

   // Получаем элемент кнопки отправки формы
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

   // Добавляем обработчики событий для каждого поля ввода
  inputList.forEach((inputElement) => {
     // Добавляем обработчик события "input"
    inputElement.addEventListener('input', function () {

       // Проверяем валидность поля ввода
      checkInputValidity(formElement, inputElement);
      
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция для включения валидации формы
const enableValidation = (config) => {

  // Получаем список форм по селектору config.formSelector
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Добавляем обработчик события 'submit' для каждой формы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      // Предотвращаем отправку формы по умолчанию
      evt.preventDefault();
    });
    // Получаем список полей ввода для текущей формы
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      // Получаем элемент кнопки отправки формы для текущей формы
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    // Добавляем обработчики событий для каждого поля ввода
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         // Проверяем валидность текущего поля ввода
        checkInputValidity(formElement, inputElement);
        // Обновляем состояние кнопки в зависимости от валидности полей ввода
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

// Включаем валидацию формы с указанными селекторами
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
});