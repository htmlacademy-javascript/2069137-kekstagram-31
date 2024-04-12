const getNumberFromString = (ourString) => {
  const newString = String(ourString);
  let resultNumber = 0;
  for (let i = 0; i < newString.length; i++) {
    if (!isNaN(Number(newString[i]))) {
      resultNumber += newString[i];
    }
  }
  return Number(resultNumber);
};

const isEscape = (evt) => evt.key === 'Escape';

export {isEscape, getNumberFromString};
