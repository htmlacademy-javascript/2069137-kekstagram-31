import { resetScale } from './scale-controls';
import { resetEffects } from './slider';
import { isEscape } from './utils';

import {showErrorModal, showSuccessModal} from './message.js';
import {sendData} from './api.js';

const formPopup = document.querySelector('.img-upload__overlay');
const popupCloseButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const imagePreview = form.querySelector('.img-upload__preview img');
const filterPreviewImages = form.querySelectorAll('.effects__preview');

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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
  const errorMessagePopup = document.querySelector('.error');
  if (isEscape(evt) && evt.target !== hashtagInput && evt.target !== commentField && errorMessagePopup === null) {
    evt.preventDefault();
    form.reset();
    closeForm();
  }
}

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
      return ourHashtags.every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH);
    },
    errorMessage: 'Максимальная длина хештега - 20 символов'
  },
  {
    validator: (value) => {
      const hashtagRegExp = /^#[a-zA-Zа-яА-Я0-9]+$/;
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

// Слушатель событий по submit на форму

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onUploadModalCloseClick = () => {
  closeUploadModal();
};

function closeUploadModal() {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  popupCloseButton.addEventListener('click', onUploadModalCloseClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessModal();
          closeUploadModal();
        })
        .catch(() => {
          showErrorModal();
        })
        .finally(unblockSubmitButton);
    }
  });
};

const getUploadPhotoUrl = (photo) => URL.createObjectURL(photo);

const initializeForm = () => {
  imageInput.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    formPopup.classList.remove('hidden');
    const photoUrl = getUploadPhotoUrl(imageInput.files[0]);
    imagePreview.src = photoUrl;
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeyDown);
    filterPreviewImages.forEach((image) => {
      image.style.backgroundImage = `url(${photoUrl})`;
    });
  });
  popupCloseButton.addEventListener('click', () => {
    closeForm();
  });

  pristine.addValidator(hashtagInput, (value) => {
    const ourHashtags = getHashtagsFromString(value);
    return ourHashtags.length <= MAX_HASHTAGS_COUNT;
  }, 'Нельзя указать больше пяти', 1, true);


  validators.forEach(({validator, errorMessage}) => {
    pristine.addValidator(hashtagInput, validator, errorMessage);
  });


  // Добавили валидатор для поля комментариев
  pristine.addValidator(commentField, (value) => value.length <= MAX_COMMENTS_LENGTH, 'Ваш комментарий превысил допустимый лимит в 140 символов');
};


export {setFormSubmit, initializeForm};
