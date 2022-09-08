export const createListMarkup = arr =>
  arr.reduce(
    (acc, { name, flags }) =>
      acc +
      `<li class="country-item"><img src="${flags.svg}" alt="Flag" width="50"><h3>${name.official}</h3></li>`,
    ''
  );

export const createCountryMarkup = arr =>
  arr.reduce(
    (acc, { name, flags, capital, population, languages }) =>
      acc +
      `<div class="country-name">
        <img src="${flags.svg}" alt="Flag" width="90" />
        <h3>${name.official}</h3>
      </div>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>`,
    ''
  );
