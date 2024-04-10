import { getNumberFromString } from './utils';

const form = document.querySelector('.img-upload__form');
const decreaseImageButton = form.querySelector('.scale__control--smaller');
const increaseImageButton = form.querySelector('.scale__control--bigger');
const scaleImage = form.querySelector('.scale__control--value');
const image = form.querySelector('.img-upload__preview img');

const SMALL_SIZE = 25;
const STEP = 25;
const BIG_SIZE = 100;

const resetScale = () => {
  image.style.transform = 'none';
};

decreaseImageButton.addEventListener('click', () => {
  if (scaleImage.value !== `${SMALL_SIZE}%`) {
    scaleImage.value = `${getNumberFromString(scaleImage.value) - STEP}%`;
    image.style.transform = `scale(${getNumberFromString(scaleImage.value) / 100})`;
  }
});

increaseImageButton.addEventListener('click', () => {
  if (scaleImage.value !== `${BIG_SIZE}%`) {
    scaleImage.value = `${getNumberFromString(scaleImage.value) + STEP}%`;
    image.style.transform = `scale(${getNumberFromString(scaleImage.value) / 100})`;
  }
});

export {resetScale};
