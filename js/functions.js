//3 функции к модулю 2
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


/* Напишите функцию, которая принимает время начала и конца рабочего дня,
  а также время старта и продолжительность встречи в минутах и возвращает true,
  если встреча не выходит за рамки рабочего дня, и false, если выходит.

  Время указывается в виде строки в формате часы:минуты. Для указания часов и минут
  могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

  Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки. */


// Функция проверяет, время начало встречи меньше ли времени конца рабочего дня И больше ли начала рабочего дня (нет - false)
/* приводим строку к массиву и берём два значения: часы и минуты. Сверяем часы с часами, минуты с минутами */
// Функция проверяет, если время начала встречи в сумме с длительностью меньше конца рабочего дня (нет - false)
// Функция возвращает true
const DATE = new Date(2001, 1, 1, 0, 0, 0);

const isInWorkTime = (workDayStart, workDayEnd, meetStart, meetLasts) => {
  const dateStartDay = new Date(DATE.getTime() + workDayStart * 60000);
  const dateEndDay = new Date(DATE.getTime() + workDayEnd * 60000);
  const dateStartMeet = new Date(DATE.getTime() + meetStart * 60000);
  const dateEndMeet = new Date(dateStartMeet.getTime() + meetLasts * 60000);

  if (dateStartMeet < dateStartDay) {
    return false;
  }


  if (dateEndMeet > dateEndDay) {
    return false;
  }

  return true;
};

isInWorkTime('8:00', '17:30', '08:00', 900);
