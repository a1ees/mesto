 // Функция для показа ошибки валидации
 const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  
  // Нашли span ошибку конкретного input в форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Добавили инпуту класс стилизации поля с ошибкой
  inputElement.classList.add(inputErrorClass);

  // Поместили текст ошибки в span
  errorElement.textContent = errorMessage;

  // Добавили класс, чтобы span был виден
  errorElement.classList.add(errorClass);
};

// Функция для скрытия ошибки валидации
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {

  // Нашли span ошибку конкретного input в форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Удалили инпуту класс стилизации поля с ошибкой
  inputElement.classList.remove(inputErrorClass);

  // Удалили класс, чтобы скрыть span
  errorElement.classList.remove(errorClass);

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
const toggleButtonState = (inputList, buttonElement, buttonElementDisabled) => {
  // Если поле невалидно(в условее помещается true), мы добавляем деактивирующий класс к кнопке и отключаем её на странице
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonElementDisabled);
    buttonElement.disabled = true;
    // В ином случае - включаем кнопку
  } else {
    buttonElement.classList.remove(buttonElementDisabled);
    buttonElement.disabled = false;
  }
};

// Функция для проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {

   // Если поле ввода невалидно (не удовлетворяет условию inputElement.validity.valid)
  if (!inputElement.validity.valid) {

    // Вызываем функцию showInputError для показа сообщения об ошибке
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {

     // Вызываем функцию hideInputError для скрытия сообщения об ошибке
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Функция для включения валидации формы
const enableValidation = (config) => {

  // Получаем список форм по селектору config.formSelector
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Добавляем обработчик события 'submit' для каждой формы
  formList.forEach((formElement) => {

    // Получаем список полей ввода для текущей формы
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    
      // Получаем элемент кнопки отправки формы для текущей формы
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    const inactiveButtonClass = config.inactiveButtonClass;
    const inputErrorClass = config.inputErrorClass;
    const errorClass = config.errorClass;


    // Добавляем обработчики событий для каждого поля ввода
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         // Проверяем валидность текущего поля ввода
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        // Обновляем состояние кнопки в зависимости от валидности полей ввода
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  });
};

// Включаем валидацию формы с указанными селекторами
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
});
