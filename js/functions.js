const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('abcdef', 6);


const isPalindrome = (ourString) => {
  const newString = ourString.toLowerCase().replaceAll(' ', '');
  for (let i = 0, j = newString.length - 1; i < (Math.floor(newString.length / 2)); i++, j--) {
    if (newString[i] !== newString[j]) {
      return false;
    }
  }
  return true;
};

isPalindrome('Лёша на полке клопа нашёл ');


const getNumber = (ourString) => {
  const newString = String(ourString);
  let resultNumber = 0;
  for (let i = 0; i < newString.length; i++) {
    if (!isNaN(newString[i])) {
      resultNumber += newString[i];
    }
  }
  return Number(resultNumber);
};

getNumber('sl39');
