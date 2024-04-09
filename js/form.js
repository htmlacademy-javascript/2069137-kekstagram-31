import { resetScale } from './scale-controls';
import { resetEffects } from './slider';
import { isEscape } from './utils';

const formPopup = document.querySelector('.img-upload__overlay');
const popupCloseButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

// Реализация закрытия & открытия формы

// Создали pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const closeForm = () => {
  pristine.reset();
  resetScale();
  resetEffects();
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if (isEscape(evt) && evt.target !== hashtagInput && evt.target !== commentField) {
    evt.preventDefault();
    form.reset();
    closeForm();
  }
}

imageInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  formPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
});

popupCloseButton.addEventListener('click', () => {
  closeForm();
});

// Создали массив хештегов

const getHashtagsFromString = (hashtagString) => hashtagString
  .trim()
  .split(' ')
  .filter((item) => item.length > 0);

// Массив валидаторов для хештегов

const validators = [
  {
    validator: (value) => {
      const ourHashtags = getHashtagsFromString(value);
      return ourHashtags.every((hashtag) => hashtag.length > 0 && hashtag[0] === '#');
    },
    errorMessage: 'Первый символ хештега должен быть #'
  },
  {
    validator: (value) => {
      const ourHashtags = getHashtagsFromString(value);
      return ourHashtags.every((hashtag) => hashtag.length > 1 || hashtag[0] !== '#');
    },
    errorMessage: 'Хештег не может быть пустым'
  },
  {
    validator: (value) => {
      const ourHashtags = getHashtagsFromString(value);
      return ourHashtags.every((hashtag) => hashtag.length <= 20);
    },
    errorMessage: 'Максимальная длина хештега - 20 символов'
  },
  {
    validator: (value) => {
      const hashtagRegExp = /^#[a-zA-Zа-я0-9]+$/;
      const ourHashtags = getHashtagsFromString(value);
      return ourHashtags.every((hashtag) => hashtag.length > 0 && hashtagRegExp.test(hashtag));
    },
    errorMessage: 'Используйте только буквы и цифры'
  },
  {
    validator: (value) => {
      value = hashtagInput.value.toLowerCase();
      const ourHashtags = getHashtagsFromString(value);
      const hashtagSet = new Set(ourHashtags);

      return ourHashtags.length === hashtagSet.size;
    },
    errorMessage: 'Нельзя писать одинаковые хештеги'
  }
];

pristine.addValidator(hashtagInput, (value) => {
  const ourHashtags = getHashtagsFromString(value);
  if (ourHashtags.length <= 5) {
    return true;
  }
  return false;
}, 'Нельзя указать больше пяти', 1, true);


validators.forEach(({validator, errorMessage}) => {
  pristine.addValidator(hashtagInput, validator, errorMessage);
});


// Добавили валидатор для поля комментариев
pristine.addValidator(commentField, (value) => {
  if (value.length > 140){
    return false;
  }
  return true;
}, 'Ваш комментарий превысил допустимый лимит в 140 символов');

// Слушатель событий по submit на форму
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
