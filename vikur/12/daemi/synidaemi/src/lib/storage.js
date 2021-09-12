/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const scoresAsJson = localStorage.getItem(LOCALSTORAGE_KEY);

  let result = null;

  try {
    result = JSON.parse(scoresAsJson);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Villa í JSON', e);
    clear();
    return [];
  }

  if (!Array.isArray(result)) {
    return [];
  }

  return result.sort((a, b) => b.points - a.points);
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function save(name, points) {
  const saved = load();
  saved.push({ name, points });

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}
