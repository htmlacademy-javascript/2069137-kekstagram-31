import { isEscape } from './utils';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment-item').content.querySelector('.social__comment');

const fillBigPicture = (card) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = card.url;
  const likesCounter = bigPicture.querySelector('.likes-count');
  likesCounter.textContent = card.likes;
  const commentsCurrentCounter = bigPicture.querySelector('.social__comment-shown-count');
  commentsCurrentCounter.textContent = card.comments.length;
  const commentsCounter = bigPicture.querySelector('.social__comment-total-count');
  commentsCounter.textContent = card.comments.length;

  const ourFragment = document.createDocumentFragment();
  card.comments.forEach((commentData) => {
    const newCommentElement = commentTemplate.cloneNode(true);
    const avatar = newCommentElement.querySelector('.social__picture');
    avatar.src = commentData.avatar;
    avatar.alt = commentData.name;
    const text = newCommentElement.querySelector('.social__text');
    text.textContent = commentData.message;
    ourFragment.appendChild(newCommentElement);
  });
  commentsList.innerHTML = '';
  commentsList.appendChild(ourFragment);

  const description = document.querySelector('.social__caption');
  description.textContent = card.description;
};

const onDocumentKeyDown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const openBigPicture = (evt, cardList) => {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');

    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeyDown);

    const pictureLink = evt.target.parentElement;
    const id = Number(pictureLink.dataset.id);

    const card = cardList.find((item) => item.id === id);

    fillBigPicture(card);
  }
};

const initialize = (cardList) => {
  pictures.addEventListener('click', (evt) => {
    openBigPicture(evt, cardList);
  });
  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeyDown);
  });
};

export {initialize};
