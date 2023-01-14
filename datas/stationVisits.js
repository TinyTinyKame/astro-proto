const fetch = require('node-fetch-polyfill');

const api = 'https://data.sncf.com/api/v2/catalog/datasets';
const endpoint = 'frequentation-gares';

async function request(options = {}) {
  const hasOptions = Object.keys(options).length > 0;
  let requestUrl = `${api}/${endpoint}/records`;

  if (hasOptions) {
    requestUrl += Object.entries(options).reduce(
      (queryString, [option, value]) => {
        const optionQuery = `${option}=${value}`;

        if (queryString.length === 0) {
          return `?${optionQuery}`;
        }

        return `${queryString}&${optionQuery}`;
      },
      ''
    );
  }

  try {
    const response = await fetch(requestUrl);
    const body = await response.json();
    
    return body;
  } catch (error) {
    console.error(error);
    
    return {};
  }
}

