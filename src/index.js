import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { createCountryMarkup, createListMarkup } from './js/createMarkup';

const DEBOUNCE_DELAY = 300;
const refs = {
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const showSearchResult = response => {
  if (response.length > 10) {
    Notify.info(
      '❗ Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (response.length > 1) {
    refs.countriesList.insertAdjacentHTML(
      'beforeend',
      createListMarkup(response)
    );
    return;
  }
  refs.countryInfo.insertAdjacentHTML(
    'beforeend',
    createCountryMarkup(response)
  );
};
const showError = () =>
  Notify.failure('🙅 Oops, there is no country with that name');

document
  .querySelector('#search-box')
  .addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const searchName = e.target.value.trim();
  refs.countriesList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (!searchName) {
    return;
  }

  fetchCountries(searchName).then(showSearchResult).catch(showError);
}
