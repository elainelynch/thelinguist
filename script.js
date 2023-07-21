const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTags = document.querySelectorAll("select"),
translateBtn = document.querySelector("button"),
exchangeIcon = document.querySelector(".exchange"),
icons = document.querySelectorAll(".icon i");

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

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTags[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTags[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});