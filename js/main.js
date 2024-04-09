import {getListOfCards} from './engine.js';
import {renderCards} from './render-cards.js';
import {initialize} from './viewing-cards.js';
import './form.js';
import './scale-controls.js';
import './slider.js';

const cardList = getListOfCards();

renderCards(cardList);
initialize(cardList);
