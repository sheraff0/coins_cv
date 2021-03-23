// Form processing
const preventSubmit = e =>
  e.keyCode === 13 &&
    e.target.nodeName !== 'TEXTAREA' &&
      e.preventDefault();

const postFormData = async (form, apiUrl) => {
  const data = new FormData(form);
  let response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept-Language': 'ru-RU'
    },
    body: data
  });
  response = await response.json()
    .catch(err => new Error(err));
  console.log(response);
  return response instanceof Error ? {} : response;
}

const renderErrorMessage = errors => {
  console.log("Error")
}

const renderResults = results => {
  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML = Object.entries(results || {}).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc + `<p><b>${key}:</b> ${value}</p>`;
  }, '');
}

const submitForm = async e => {
  const form = e.target;
  const apiUrl = "/process-image/";
  console.log({ form, apiUrl });
  e.preventDefault();
  const { message, results, errors } = await postFormData(form, apiUrl);
  if (message === 'ok') {
    renderResults(results);
  } else {
    renderErrorMessage(errors);
  }
}
