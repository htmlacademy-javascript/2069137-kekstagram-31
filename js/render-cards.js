const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderCards = (cardList) => {
  cardList.forEach((card) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.dataset.id = card.id;
    const pictureImage = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureImage.src = card.url;
    pictureImage.alt = card.description;
    pictureLikes.textContent = card.likes;
    pictureComments.textContent = card.comments.length;
    fragment.appendChild(picture);
  });

  pictureContainer.appendChild(fragment);
};

export {renderCards};
