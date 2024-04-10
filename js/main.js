import {renderThumbnails} from './thumbnails.js';
import {initialize} from './viewing-cards.js';
import './form.js';
import './scale-controls.js';
import './slider.js';

import {getData} from './api.js';
import {initFilter} from './filter.js';
import {dataErrorMessage} from './message.js';
import {setFormSubmit} from './form.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initialize(photos);
    initFilter(renderThumbnails, photos);
  })
  .catch(() => {
    dataErrorMessage();
  });

setFormSubmit();
