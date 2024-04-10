const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getNumberFromString = (ourString) => {
  const newString = String(ourString);
  let resultNumber = 0;
  for (let i = 0; i < newString.length; i++) {
    if (isNaN(newString[i])) {
      resultNumber += newString[i];
    }
  }
  return Number(resultNumber);
};

const isEscape = (evt) => evt.key === 'Escape';

export {getRandomInteger, isEscape, getNumberFromString};
