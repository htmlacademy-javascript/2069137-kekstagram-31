import { getNumberFromString } from './utils';

const form = document.querySelector('.img-upload__form');
const decreaseImageButton = form.querySelector('.scale__control--smaller');
const increaseImageButton = form.querySelector('.scale__control--bigger');
const scaleImage = form.querySelector('.scale__control--value');
const image = form.querySelector('.img-upload__preview img');

decreaseImageButton.addEventListener('click', () => {
  if (scaleImage.value !== '25%') {
    scaleImage.value = `${getNumberFromString(scaleImage.value) - 25}%`;
    image.style.transform = `scale(${getNumberFromString(scaleImage.value) / 100})`;
  }
});

increaseImageButton.addEventListener('click', () => {
  if (scaleImage.value !== '100%') {
    scaleImage.value = `${getNumberFromString(scaleImage.value) + 25}%`;
    image.style.transform = `scale(${getNumberFromString(scaleImage.value) / 100})`;
  }
});

