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

const renderErrorMessages = errors => {
  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML = Object.values(errors).reduce((acc, curr) =>
    acc + `<p>${curr}</p>`);
}

const renderResults = results => {
  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML =`
    <p>Размеры изображения: ${results.dimensions.join(":")}</p>
    <p>Средний цвет:
      <div class="sprite" style="background-color: rgb(${results.avg_color.join(', ')})"></div>
    </p>
    <p>Найдено монет: ${results.coins.length}</p>
  `;
  const previewImage = document.querySelector('#preview img');
  previewImage.src = `data:image/jpg;base64,${results.image_base64}`;
}

const submitForm = async e => {
  const form = e.target;
  const apiUrl = "/process-image/";
  e.preventDefault();
  const { message, results, errors } = await postFormData(form, apiUrl) || {};
  if (message === 'ok') {
    renderResults(results);
  } else {
    renderErrorMessages(errors);
  }
}
