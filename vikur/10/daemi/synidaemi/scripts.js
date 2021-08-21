// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

function el(name, ...children) {
  const element = document.createElement(name);

  for (let child of children) { /* eslint-disable-line */
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  }

  return element;
}

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;
  let results;

  function showLoading() {
    empty(results);

    const img = document.createElement('img');
    img.setAttribute('alt', '');
    img.setAttribute('src', 'loading.gif');

    const loading = el('div', img, 'Leita að léni...');
    loading.classList.add('loading');

    results.appendChild(loading);
  }

  function showMessage(msg) {
    empty(results);
    results.appendChild(el('p', msg));
  }

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function showResults(searchResults) {
    if (searchResults.length === 0) {
      showMessage('Lén er ekki skráð');
      return;
    }

    const [{
      domain,
      registered,
      lastChange,
      expires,
      registrantname,
      address,
      country,
      email,
    }] = searchResults;

    const element =
      el('dl',
        el('dt', 'Lén'),
        el('dd', domain),
        registrantname ? el('dt', 'Skráningaraðili') : null,
        registrantname ? el('dd', registrantname) : null,
        el('dt', 'Skráð'),
        el('dd', registered),
        el('dt', 'Seinast breytt'),
        el('dd', lastChange),
        el('dt', 'Rennur út'),
        el('dd', expires),
        email ? el('dt', 'Netfang') : null,
        email ? el('dd', email) : null,
        address ? el('dt', 'Heimilisfang') : null,
        address ? el('dd', address) : null,
        country ? el('dt', 'Land') : null,
        country ? el('dd', country) : null,
      );

    empty(results);

    results.appendChild(element);
  }

  function search(value) {
    showLoading();

    fetch(`${API_URL}${value}`)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }

        return result.json();
      })
      .then((data) => {
        showResults(data.results);
      })
      .catch((error) => {
        console.error('Villa', error);
        showMessage('Villa við að sækja gögn');
      })
  }

  function onSubmit(e) {
    e.preventDefault();

    const value = input.value;

    // TODO höndla tómstreng

    search(value);
  }

  function init(domains) {
    const form = domains.querySelector('form');
    input = form.querySelector('input');
    results = domains.querySelector('.results');

    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(document.querySelector('.domains'));
});
