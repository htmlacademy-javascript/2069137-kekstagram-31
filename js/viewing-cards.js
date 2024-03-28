/*
Написать программу, которая будет раскрывать миниатюры, в которых можно:
1. Поставить лайк
2. Увидеть все комментарии

Миниатюра раскрывается по клику. Данные берутся из объекта для отрисовки.
Чтобы раскрыть:
1. + удалить класс .hidden у .big-picture и заполнить данными из миниатюры:
  + а) src для .big-picture__img = url
  + б) value для .likes-count = likes
  + в) .social__comment-total-count = comments.length
  г) .social__comments = comments
  <li class="social__comment">
    <img
      class="social__picture"
      src="{{аватар}}"
      alt="{{имя комментатора}}"
      width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
  </li>
  д) .social__caption = description
2. Добавить класс hidden и спрятать блоки счётчика комментариев .social__comment-count и и загрузки новых комментариев .comments-loader
+ 3. Добавить body .modal-open для отмены скролла страницы

При закрытии:
1. Удалить .modal-open y body
2. Прописать закрытие по ESC и клику по иконке
*/

// import { renderCards } from './render-cards';

// const picturesContainer = document.querySelector('.pictures');
// const picturesList = picturesContainer.children;


const pictures = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');

const closeBigCard = () => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const initialize = (cardList) => {

  const getBigCard = (evt) => {
    if (evt.target.matches('.picture__img')) {
      const pictureLink = evt.target.parentElement;
      const id = pictureLink.dataset.id;
      const bigImage = document.querySelector('.big-picture__img img');
      bigImage.src = evt.target.src;
      const likesCounter = document.querySelector('.likes-count');
      likesCounter.textContent = pictureLink.dataset.likes;
      const commentsCounter = document.querySelector('.social__comment-total-count');
      commentsCounter.textContent = pictureLink.dataset.comments;
      const comments = document.querySelector('.social__comments');
      // comments.appendChild(cardList[id].comments);
      const description = document.querySelector('.social__caption');
      description.textContent = pictureLink.dataset.description;

      const bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');


      document.body.classList.add('modal-open');

      closeButton.addEventListener('click', closeBigCard);
    }
  };


  pictures.addEventListener('click', getBigCard);

};

export {initialize};
