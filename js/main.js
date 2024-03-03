// Написать на JS программу, которая создаёт массив из 25 сгенерированных объектов.

// Каждый объект содержит:
//  id, случ. неповтор. число от 1 до 25
//  url, строка вида photos/x.jpg, x - случ. неповтор. число от 1 до 25
//  description, любая строка
//  likes, случ. число от 15 до 200
//  comments, массив объектов, содержит:
//    id, случ. неповтор. число
//    avatar, строка вида img/avatar-x.svg, x - случ. число от 1 до 6
//    message, 2 случ. строки из предоставленного массива
//    name, случ. строка из предоставленного массива

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Тимур',
  'Екатерина',
  'Дмитрий',
  'Виктория',
  'Тимофей',
  'Елизавета',
  'Сергей',
  'Вячеслав',
  'Владимир',
  'Ульяна'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqueIndex = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
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

// Каждый объект содержит:
//  id, случ. неповтор. число от 1 до 25
//  url, строка вида photos/x.jpg, x - случ. неповтор. число от 1 до 25
//  description, любая строка
//  likes, случ. число от 15 до 200
//  comments, случ. число от 0 до 30

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz '.split('');

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

const minRandomIndex = 1;
const maxRandomIndex = 25;
const minRandomLikes = 15;
const maxRandomLikes = 200;
const randomUniqueCardId = getRandomUniqueIndex(minRandomIndex, maxRandomIndex);
const randomUniqueCardUrl = getRandomUniqueIndex(minRandomIndex, maxRandomIndex);
const randomUniqueCardLikes = getRandomUniqueIndex(minRandomLikes, maxRandomLikes);

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

const listOfCards = [];
for (let i = 0; i < 25; i++) {
  listOfCards.push(getNewCard());
}
