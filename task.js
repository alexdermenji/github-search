const form = document.querySelector(".search__form");
const resultsContainer = document.querySelector(".search__findings-list");
const countContainer = document.querySelector(".search__findings");
const errorContainer = document.querySelector(".search__error");

const renderError = () => {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            Error happened...
        </p>
  `;
  countContainer.innerHTML = "";
};

const renderEmptyResults = () => {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            We can't find anything.
        </p>
  `;
  countContainer.innerHTML = "";
};

const renderCount = (count) => {
  countContainer.innerHTML = `
      Found <span class="search__findings-amount">${count.toLocaleString(
        "ru-RU"
      )}</span> results
  `;
};

const onSubmitStart = () => {
  countContainer.innerHTML = `Loading...`;
  resultsContainer.innerHTML = "";
  errorContainer.innerHTML = "";
};

function template(item) {
  const newElement = document.createElement("li");
  newElement.classList.add("search__finding-item");
  newElement.innerHTML = `<a href=${item.html_url} class="search__finding-link" target="_blank">${item.full_name}</a>
  <span class="search__finding-description">${item.description}</span>`;
  return newElement;
}

form.addEventListener("submit", (event) => {
  onSubmitStart();
  onSubmit(event);
});

async function onSubmit(event) {
  // ваш код

  event.preventDefault();
  const value = form.elements.title.value;
  const url = `https://api.nomoreparties.co/github-search?q=${value}`;
  let jsonResponse = await fetch(url);
  let response = await jsonResponse.json();

  if (response.items.length) {
    renderCount(response.total_count);
    for (const item of response.items) {
      resultsContainer.insertAdjacentElement("beforeend", template(item));
    }
  } else if (response.total_count === 0) {
    renderEmptyResults();
  }
}
