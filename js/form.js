/*
+ 1. Прописать тегу <form> значения:
    method
    enctype
    action

Далее:
Форма заполнена верно - при отправке открывается страница сервера из action с данными.
Форма заполнена неверно - при отправке открывается страница с ошибками

??? В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.
??? Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения. Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания. В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.

!!! Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа. В данном задании этот пункт реализовывать не нужно.

+ 2. Форма закрывается при ...
3. Сбрасывается значение из .img-upload__input
Значение других полей формы также нужно сбрасывать.

Напишите код для валидации формы добавления изображения, используя библиотеку Pristine (скрипт находится в директории /vendor/pristine). Список полей для валидации: Хэштеги Комментарий
Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
*/
import { isEscape } from './utils';

const popupOpenButton = document.querySelector('.img-upload__control');
const formPopup = document.querySelector('.img-upload__overlay');
const popupCloseButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const imageInput = document.querySelector('.img-upload__input');

// Реализация закрытия & открытия формы

const onDocumentKeyDown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    formPopup.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageInput.value = '';
    overlay.classList.add('hidden');

  }
};

imageInput.onchange = () => {
  overlay.classList.remove('hidden');
  popupOpenButton.addEventListener('click', () => {
    formPopup.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};


popupCloseButton.addEventListener('click', () => {
  formPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageInput.value = '';
  overlay.classList.add('hidden');
});

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

// Удаление и добавление работы закрытия попапа по Escape, когда фокус на элементе и когда снят

hashtagInput.onfocus = () => {
  document.removeEventListener('keydown', onDocumentKeyDown);
};
commentField.onfocus = () => {
  document.removeEventListener('keydown', onDocumentKeyDown);
};

hashtagInput.onblur = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
};

commentField.onblur = () => {
  document.addEventListener('keydown', onDocumentKeyDown);
};

// Работа с pristine

// Создали pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Создали массив хештегов (заполняем в form.addEventListener)
let hashtagList = hashtagInput.value.split(' ');

// hashtagInput.onchange = () => {
//   hashtagList = hashtagInput.value.split(' ');
// };

// Массив валидаторов для хештегов
const validators = [
  {
    validator: () => {
      hashtagList.forEach((hashtag) => {
        if (hashtag.length > 1 && hashtag[0] !== '#') {
          return false;
        }
        return true;
      });
    },
    errorMessage: 'Первый символ должен быть #'
  },
  {
    validator: () => {
      hashtagList.forEach((hashtag) => {
        if (hashtag[0] === '#' && (hashtag.length === 1 || hashtag.length > 20)) {
          return false;
        }
        return true;
      });
    },
    errorMessage: 'Длина хештега должна быть от 2 до 20 символов'
  }
];

// Перебор массива валидаторов и передача валидатора в addValidator
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
  hashtagList = hashtagInput.value.split(' ');
  pristine.validate();
});
