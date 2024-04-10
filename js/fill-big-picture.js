const commentTemplate = document.querySelector('#comment-item').content.querySelector('.social__comment'); // шаблон комментария
const bigPicture = document.querySelector('.big-picture'); // попап
const commentsCurrentCounter = bigPicture.querySelector('.social__comment-shown-count'); // Кол-во комментариев в наст. время
const showMoreButton = bigPicture.querySelector('.social__comments-loader'); // Кнопка "Показать больше"
const commentsListElement = bigPicture.querySelector('.social__comments'); // Список комментариев
const image = bigPicture.querySelector('.big-picture__img img');
const likesCounter = bigPicture.querySelector('.likes-count');
const commentsCounter = bigPicture.querySelector('.social__comment-total-count');

let commentList = []; // Массив комментариев
let visibleCardCounter = 0;
const STEP = 5;

// Отрисовка нужных комментариев из массива
const renderComments = (comments) => {
  const ourFragment = document.createDocumentFragment();

  comments.forEach((commentData) => {
    const newCommentElement = commentTemplate.cloneNode(true);
    const avatar = newCommentElement.querySelector('.social__picture');
    avatar.src = commentData.avatar;
    avatar.alt = commentData.name;
    const text = newCommentElement.querySelector('.social__text');
    text.textContent = commentData.message;
    ourFragment.appendChild(newCommentElement);
  });
  commentsListElement.appendChild(ourFragment);
};

// Добавление следующих комментариев (1-5)
const showMoreComments = () => {
  if (visibleCardCounter + STEP < commentList.length) {
    renderComments(commentList.slice(visibleCardCounter, visibleCardCounter + STEP));
    visibleCardCounter += STEP;
    commentsCurrentCounter.textContent = visibleCardCounter;
  } else {
    renderComments(commentList.slice(visibleCardCounter, commentList.length));
    visibleCardCounter = commentList.length;
    commentsCurrentCounter.textContent = String(commentList.length);
    showMoreButton.classList.add('hidden');
  }
};

// Функция по заполнению большой карточки
const fillBigPicture = (card) => {
  commentsListElement.innerHTML = '';

  image.src = card.url;
  likesCounter.textContent = card.likes;

  commentsCurrentCounter.textContent = visibleCardCounter;
  commentsCounter.textContent = String(card.comments.length);

  // renderComments(card.comments.slice(0, 5));
  commentList = card.comments;
  showMoreComments();

  const description = document.querySelector('.social__caption');
  description.textContent = card.description;
};

// Сбрасывание счетчика отображенных комментариев
const resetCommentCounter = () => {
  showMoreButton.classList.remove('hidden');
  visibleCardCounter = 0;
};

showMoreButton.addEventListener('click', showMoreComments); // Слушатель событий по клику на "Показать ещё"

export {fillBigPicture, resetCommentCounter};
