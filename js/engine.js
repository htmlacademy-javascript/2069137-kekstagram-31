import { MESSAGES, NAMES, ALPHABET } from './data.js';
import { getRandomInteger, getRandomUniqueNumber } from './utils.js';


const randomUniqueMessageId = getRandomUniqueNumber(1, 1000);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getNewComment = () => {
  const randomAvatarId = getRandomInteger(1, 6);
  return {
    id: randomUniqueMessageId(),
    avatar: `img/avatar-${randomAvatarId}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

const minDescriptionLength = 5;
const maxDescriptionLength = 25;

const descriptionLength = getRandomInteger(minDescriptionLength, maxDescriptionLength);

const getCardDescription = () => {
  let newCardDescription = '';
  for (let i = 0; i < descriptionLength; i++) {
    newCardDescription += getRandomArrayElement(ALPHABET);
  }
  return newCardDescription;
};

const MIN_CARD_LIKES = 15;
const MAX_CARD_LIKES = 200;
const randomUniqueCardLikes = getRandomUniqueNumber(MIN_CARD_LIKES, MAX_CARD_LIKES);

const getNewCard = (id) => {
  const randomCommentsCount = getRandomInteger(0, 30);

  const commentsList = Array.from({length: randomCommentsCount}, getNewComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getCardDescription(),
    likes: randomUniqueCardLikes(),
    comments: commentsList
  };

};

const listOfCards = () => Array.from({length: 25}, (_, index) => getNewCard(index + 1));

export {getNewCard, listOfCards};
