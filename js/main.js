import {renderThumbnails} from './thumbnails';
import {initialize} from './viewing-cards';
import {initializeForm, setFormSubmit} from './form';
import './scale-controls';
import './slider';

import {getData} from './api';
import {initFilter} from './filter';
import {dataErrorMessage} from './message';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initialize(photos);
    initFilter(renderThumbnails, photos);
  })
  .catch(() => {
    dataErrorMessage();
  });

initializeForm();

setFormSubmit();
