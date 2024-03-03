import { MESSAGES, NAMES, ALPHABET } from './data.js';
import { getRandomInteger, getRandomUniqueIndex } from './utils.js';


const randomUnicMessageId = getRandomUniqueIndex(1, 1000);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getNewComment = () => {
  const randomAvatarId = getRandomInteger(1, 6);
  return {
    id: randomUnicMessageId(),
    avatar: `img/avatar-${randomAvatarId}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

const minDescriptionLength = 5;
const maxDescriptionLength = 25;

const descriptionLength = getRandomInteger(minDescriptionLength, maxDescriptionLength);

const getCardDescription = () => {
  let newCardDesctiption = '';
  for (let i = 0; i < descriptionLength; i++) {
    newCardDesctiption += getRandomArrayElement(ALPHABET);
  }
  return newCardDesctiption;
};

const MIN_CARD_ID = 1;
const MAX_CARD_ID = 25;
const MIN_CARD_LIKES = 15;
const MAX_CARD_LIKES = 200;
const randomUniqueCardId = getRandomUniqueIndex(MIN_CARD_ID, MAX_CARD_ID);
const randomUniqueCardUrl = getRandomUniqueIndex(MIN_CARD_ID, MAX_CARD_ID);
const randomUniqueCardLikes = getRandomUniqueIndex(MIN_CARD_LIKES, MAX_CARD_LIKES);

const getNewCard = () => {
  const randomCommentsCount = getRandomInteger(0, 30);

  const commentsList = Array.from({length: randomCommentsCount}, getNewComment());

  return {
    id: randomUniqueCardId(),
    url: `photos/${randomUniqueCardUrl()}.jpg`,
    description: getCardDescription(),
    likes: randomUniqueCardLikes(),
    comments: commentsList
  };

};

const listOfCards = () => Array.from({length: 25}, getNewCard);

export {listOfCards};
