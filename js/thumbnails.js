const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;

  thumbnail.dataset.id = id;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

export {renderThumbnails, removeThumbnails};
