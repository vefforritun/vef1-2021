/**
 * Úr sýnilausn fyrir verkefni 7.
 */

const operators = ['+', '-', '*', '/'];

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Útbýr spurningu og skilar sem hlut:
* { problem: strengur með spurningu, answer: svar við spurningu sem tala }
*/
// eslint-disable-next-line import/prefer-default-export
export function createQuestion() {
  const operator = operators[randomNumber(0, operators.length - 1)];

  let a = null;
  let b = null;
  let answer = null;

  switch (operator) {
    case '+':
      a = randomNumber(10, 100);
      b = randomNumber(10, 100);
      answer = a + b;
      break;
    case '-':
      a = randomNumber(10, 100);
      b = randomNumber(10, a);
      answer = a - b;
      break;
    case '*':
      a = randomNumber(1, 10);
      b = randomNumber(1, 10);
      answer = a * b;
      break;
    case '/':
      b = randomNumber(2, 10);
      a = randomNumber(2, 10) * b;
      answer = a / b;
      break;
    default:
      break;
  }

  return {
    problem: `${a} ${operator} ${b}`,
    answer,
  };
}
