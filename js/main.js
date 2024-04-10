import {getListOfCards} from './engine.js';
import {renderCards} from './render-cards.js';
import {initialize} from './viewing-cards.js';
import './form.js';
import './scale-controls.js';
import './slider.js';

import {getData} from './api.js';
import {initFilter} from './filter.js';
// import {renderThumbnails} from './thumbnails.js';
import {dataErrorMessage} from './message.js';
import {setFormSubmit} from './form.js';

const cardList = getListOfCards();

renderCards(cardList);
initialize(cardList);

getData()
  .then((photos) => {
    renderCards(photos);
    initialize(photos);
    initFilter(renderCards, photos);
  })
  .catch(() => {
    dataErrorMessage();
  });

setFormSubmit();
