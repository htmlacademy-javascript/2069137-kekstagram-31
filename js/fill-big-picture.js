const commentTemplate = document.querySelector('#comment-item').content.querySelector('.social__comment'); // шаблон комментария
const bigPicture = document.querySelector('.big-picture'); // попап
const commentsCurrentCounter = bigPicture.querySelector('.social__comment-shown-count'); // Кол-во комментариев в наст. время
const showMoreButton = bigPicture.querySelector('.social__comments-loader'); // Кнопка "Показать больше"
const commentsListElement = bigPicture.querySelector('.social__comments'); // Список комментариев
const totalCommentsCounter = bigPicture.querySelector('.social__comment-total-count'); // Общее кол-во комментариев

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
    visibleCardCounter += 5;
    if (visibleCardCounter <= Number(totalCommentsCounter.textContent)) {
      commentsCurrentCounter.textContent = visibleCardCounter;
    } else {
      commentsCurrentCounter.textContent = totalCommentsCounter.textContent;
      showMoreButton.classList.add('hidden');
    }
  } else {
    renderComments(commentList.slice(visibleCardCounter, commentList.length));
    visibleCardCounter = commentList.length;
    commentsCurrentCounter.textContent = commentList.length;
    showMoreButton.classList.add('hidden');
  }
};

// Функция по заполнению большой карточки
const fillBigPicture = (card, cardContainer) => {
  commentsListElement.innerHTML = '';

  const image = cardContainer.querySelector('.big-picture__img img');
  image.src = card.url;
  const likesCounter = cardContainer.querySelector('.likes-count');
  likesCounter.textContent = card.likes;

  commentsCurrentCounter.textContent = visibleCardCounter;
  const commentsCounter = bigPicture.querySelector('.social__comment-total-count');
  commentsCounter.textContent = card.comments.length;

  // renderComments(card.comments.slice(0, 5));
  commentList = card.comments;
  showMoreComments();

  const description = document.querySelector('.social__caption');
  description.textContent = card.description;
};


showMoreButton.addEventListener('click', showMoreComments); // Слушатель событий по клику на "Показать ещё"

// Сбрасывание счетчика отображенных комментариев
const resetCommentCounter = () => {
  showMoreButton.classList.remove('hidden');
  visibleCardCounter = 0;
};


export {fillBigPicture, resetCommentCounter};
