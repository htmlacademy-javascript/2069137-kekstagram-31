import { removeThumbnails } from './thumbnails.js';

const DEBOUNCE_DELAY = 500;
const RENDER_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PICTURES_AMOUNT = 10;

const filterList = document.querySelector('.img-filters');

let currentActiveButton = filterList.querySelector('#filter-default');

const showFilters = () => {
  filterList.classList.remove('img-filters--inactive');
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
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const initFilter = (cb, photos) => {
  showFilters();
  const getDebouncedFunction = debounce((data) => {
    removeThumbnails();
    cb(data);
  }, RENDER_DELAY);

  const onFilterBtnClick = (evt) => filterPictures(evt, getDebouncedFunction, photos);
  filterList.addEventListener('click', onFilterBtnClick);
};

export {initFilter};
