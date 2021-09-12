// todo vísa í rétta hluti með import

import Highscore, { score } from './highscore';
import { createQuestion } from './question';
import { save } from './storage';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  problem.classList.add('problem--hidden');
  result.classList.remove('result--hidden');

  const points = score(total, correct, playTime);

  const resultText = result.querySelector('.result__text');

  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;

  resultText.textContent = text;

  // todo útfæra
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  const timer = problem.querySelector('.problem__timer');
  timer.textContent = current;

  if (current <= 0) {
    return finish();
  }

  return () => {
    setTimeout(tick(current - 1), 1000);
  };
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  total += 1;
  currentProblem = createQuestion();
  const question = problem.querySelector('.problem__question');
  question.textContent = currentProblem.problem;
}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  startButton.classList.add('button--hidden');
  problem.classList.remove('problem--hidden');

  total = 0;
  correct = 0;

  setTimeout(tick(playTime), 1000);

  showQuestion();
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();

  const input = e.target.querySelector('input');
  const answer = Number.parseInt(input.value, 10);

  if (currentProblem.answer === answer) {
    correct += 1;
  }

  input.value = '';

  showQuestion();
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  const input = e.target.querySelector('input');
  const name = input.value;

  const points = score(total, correct, playTime);

  save(name, points);

  const highscore = new Highscore();
  highscore.load();

  total = 0;
  correct = 0;

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;

  startButton = document.querySelector('.start');
  result = document.querySelector('.result');
  problem = document.querySelector('.problem');

  startButton.addEventListener('click', start);

  const scoreForm = document.querySelector('.problem__answer');
  scoreForm.addEventListener('submit', onSubmit);

  const resultForm = document.querySelector('.result__form');
  resultForm.addEventListener('submit', onSubmitScore);
}
