function checkStringLength (string, maxLength) {
  return (string.length <= maxLength);
}

checkStringLength('abcdef', 6);


function isPalindrome (string) {
  string = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0, j = string.length - 1; i < (Math.floor(string.length / 2)); i++, j--) {
    if (string[i] !== string[j]) {
      return false;
    }
  }
  return true;
}

isPalindrome('Лёша на полке клопа нашёл ');


const getNumber = (string) => {
  string = String(string);
  let resultNumber = 0;
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      resultNumber += string[i];
    }
  }
  return Number(resultNumber);
};

getNumber('sl39');
