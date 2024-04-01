import { fillBigPicture, resetCommentCounter } from './fill-big-picture';
import { isEscape } from './utils';

const pictures = document.querySelector('.pictures'); // Список с миниатюрами
const bigPicture = document.querySelector('.big-picture'); // Большое фото

// Обработчик события по клавише
const onDocumentKeyDown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    resetCommentCounter();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};


// Обработчик события по клику на миниатюру
const openBigPicture = (evt, cardList) => {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');

    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeyDown); // Добавляет обработчик события по клавише

    const pictureLink = evt.target.parentElement; // Находит родителя миниатюры
    const id = Number(pictureLink.dataset.id); // Находит id из дата-атрибута родителя

    const card = cardList.find((item) => item.id === id); // Ищет по id карточку миниатюры в списке карточек

    fillBigPicture(card, bigPicture); // Вызывает функцию заполнения фотокарточки
  }
};


// Инициализатор со слушателем события по клику
const initialize = (cardList) => {
  const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  pictures.addEventListener('click', (evt) => { // Слушатель события по клику на список
    openBigPicture(evt, cardList);
  });
  bigPictureClose.addEventListener('click', () => { // Слушатель события по клику на кнопку закрытия
    bigPicture.classList.add('hidden');
    resetCommentCounter();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeyDown);
  });
};

export {initialize};
