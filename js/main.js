import {getListOfCards} from './engine.js';
import {renderCards} from './render-cards.js';
import {initialize} from './viewing-cards.js';

const cardList = getListOfCards();
renderCards(cardList);
initialize(cardList);
