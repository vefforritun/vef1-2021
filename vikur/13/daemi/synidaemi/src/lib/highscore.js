// todo vísa í rétta hluti með import

import { el, empty } from './helpers';
import { clear, load } from './storage';

/**
 * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
 * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
 * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
 *
 * @param {number} total Heildarfjöldi spurninga
 * @param {number} correct Fjöldi svarað rétt
 * @param {number} time Tími sem spurningum var svarað á í sekúndum
 *
 * @returns {number} Stig fyrir svör
 */
export function score(total, correct, time) {
  const t = correct / total;

  return Math.round(
    (((t ** 2) + correct) * total) / time,
  ) * 100;
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');

    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    const scores = load();
    this.highscore(scores);
  }

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    clear();
    empty(this.scores);
    const noScores = document.createElement('p');
    noScores.textContent = 'Engin stig skráð';

    this.scores.appendChild(noScores);

    this.button.classList.add('highscore__button--hidden');
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    if (data.length === 0) {
      return;
    }

    empty(this.scores);

    const ol = el('ol');

    data.forEach(({ name, points }) => {
      const numberEl = el('span', `${points} stig`);
      numberEl.classList.add('highscore__number');

      const nameEl = el('span', name);
      nameEl.classList.add('highscore__name');

      ol.appendChild(el('li', numberEl, nameEl));
    });

    this.button.classList.remove('highscore__button--hidden');
    this.scores.appendChild(ol);
  }
}
