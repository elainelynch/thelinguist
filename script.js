const selectTags = document.querySelectorAll('select');

selectTags.forEach((selectTag, id) => {
  for (const country_code in countries) {
    let selected = "";
    if (id === 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id === 1 && country_code === "es-ES") {
      selected = "selected";
    }
    const option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    selectTag.insertAdjacentHTML("beforeend", option);
  }
});