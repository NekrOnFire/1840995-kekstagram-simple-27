import { form, previewPicture } from './util.js';

const effectLevel = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;
const isDefault = () => currentEffect === DEFAULT_EFFECT;

const refreshSlider = () => {
  slider.classList.remove('hidden');
  if (isDefault()) {
    slider.classList.add('hidden');
  }
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,

  });
};

if (isDefault()) {
  slider.classList.add('hidden');
}

const onFilterChange = (evt) => {
  const currentValue = evt.target.value;
  if (evt.target.matches('input[type="radio"]')) {
    const previewClasses = previewPicture.className.split(' ');
    const effectClass = previewClasses.find((className) => className.includes('effects__preview--'));
    previewPicture.classList.remove(effectClass);
    previewPicture.classList.add(`effects__preview--${currentValue}`);
    currentEffect = EFFECTS.find((effect) => effect.name === currentValue);
    refreshSlider();
  }
};

const onSliderUpdates = () => {
  previewPicture.style.filter = 'none';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = slider.noUiSlider.get();
  previewPicture.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevel.value = sliderValue;
};

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  previewPicture.className = '';
  refreshSlider();
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});
refreshSlider();

form.addEventListener('change', onFilterChange);
slider.noUiSlider.on('update', onSliderUpdates);

export { resetEffect };
