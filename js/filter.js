import { removeCards } from './render-cards';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PICTURES_AMOUNT = 10;

const filters = document.querySelector('.img-filters');

let currentActiveButton = filters.querySelector('#filter-default');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const sortRandomly = () => 0.5 - Math.random();

const getFilteredPictures = (filter, photos) => {
  switch (filter) {
    case Filter.RANDOM: {
      return photos.toSorted(sortRandomly).slice(0, RANDOM_PICTURES_AMOUNT);
    }

    case Filter.DISCUSSED:
      return photos.toSorted(sortByComments);

    default:
      return photos;
  }
};

const filterPictures = (evt, cb, photos) => {
  if (evt.target.classList.contains('img-filters__button')) {
    currentActiveButton.classList.remove('img-filters__button--active');
    currentActiveButton = evt.target;
    currentActiveButton.classList.add('img-filters__button--active');

    const filtersData = getFilteredPictures(evt.target.id, photos);
    cb(filtersData);
  }
};

/* Устранение дребезга */
const DEBOUNCE_DELAY = 500;

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const RENDER_DELAY = 500;

const initFilter = (cb, photos) => {
  showFilters();
  const getDebouncedFunction = debounce((data) => {
    removeCards();
    cb(data);
  }, RENDER_DELAY);

  const onFilterBtnClick = (evt) => filterPictures(evt, getDebouncedFunction, photos);
  filters.addEventListener('click', onFilterBtnClick);
};

export {initFilter};
