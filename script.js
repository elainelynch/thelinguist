const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTags = document.querySelectorAll("select"),
translateBtn = document.querySelector("button");
exchangeIcon = document.querySelector(".exchange")

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

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
  translateFrom = selectTags[0].value,
  translateTo = selectTags[1].value;
  console.log(text, translateFrom, translateTo);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(res => res.json()).then(data => {
    console.log(data);
    toText.value = data.responseData.translatedText;
  });
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value;
  tempLang = selectTags[0].value;
  fromText.value = toText.value;
  selectTags[0].value = selectTags[1].value;
  toText.value = tempText;
  selectTags[1].value = tempLang;
});