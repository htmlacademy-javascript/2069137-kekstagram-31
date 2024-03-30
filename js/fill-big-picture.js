const commentTemplate = document.querySelector('#comment-item').content.querySelector('.social__comment');

const fillBigPicture = (card, cardContainer) => {
  const commentsList = cardContainer.querySelector('.social__comments');
  const image = cardContainer.querySelector('.big-picture__img img');
  image.src = card.url;
  const likesCounter = cardContainer.querySelector('.likes-count');
  likesCounter.textContent = card.likes;
  const commentsCurrentCounter = cardContainer.querySelector('.social__comment-shown-count');
  commentsCurrentCounter.textContent = card.comments.length;
  const commentsCounter = cardContainer.querySelector('.social__comment-total-count');
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

export {fillBigPicture};
