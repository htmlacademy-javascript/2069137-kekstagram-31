const form = document.querySelector('.img-upload__form');
const filterFieldset = form.querySelector('.img-upload__effects');
const image = form.querySelector('.img-upload__preview img');
const sliderWrapper = form.querySelector('.img-upload__effect-level');
const slider = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');
let currentEffect = 'none';

const effectValueToStyleMap = {
  none: () => 'none',
  chrome: (value = 1) => `grayscale(${value})`,
  sepia: (value = 1) => `sepia(${value})`,
  marvin: (value = 100) => `invert(${value}%)`,
  phobos: (value = 3) => `blur(${value}px)`,
  heat: (value = 3) => `brightness(${value})`
};

const effectValueToSliderMap = {
  none: {
    range: {
      min: 0,
      max: 0
    },
    step: 0,
    start: 0,
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    start: 100,
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    start: 3,
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    start: 3,
  }
};

const resetEffects = () => {
  image.style.filter = effectValueToStyleMap.none();
  sliderWrapper.classList.add('hidden');
};

filterFieldset.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    resetEffects();
    return;
  }
  sliderWrapper.classList.remove('hidden');
  currentEffect = evt.target.value;
  const {start, ...options} = effectValueToSliderMap[evt.target.value];
  slider.noUiSlider.updateOptions(options);
  slider.noUiSlider.set(start);
  image.style.filter = effectValueToStyleMap[evt.target.value]();
});

slider.noUiSlider.on('update', ([currentValue]) => {
  sliderValue.value = Number(currentValue);
  image.style.filter = effectValueToStyleMap[currentEffect](currentValue);

});

noUiSlider.create(slider, {
  start: 1,
  connect: [true, false],
  range: {
    'min': 0,
    'max': 100
  }
});

export {resetEffects};
