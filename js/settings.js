let body = document.querySelector(".body");
let title = document.querySelector(".settings__title");
let dailyTargetText = document.querySelector(".daily-target__text");
let dailyTargetInput = document.querySelector(".daily-target__input");
let selectLabels = document.querySelectorAll(".setting-select__label");
let selectOptions = document.querySelectorAll(".setting-select__option_theme");
let currentTarget = document.querySelector(".daily-target__current-value");
let themeSelect = document.querySelector("#appearance-select");
let languageSelect = document.querySelector("#language-select");

function changeColorTheme() {
    if (JSON.parse(localStorage.getItem("colorTheme")) == "dark") {
        body.classList.add("body_dark");
    } else {
        body.classList.remove("body_dark");
    }
}

function changeLanguage() {
    let language = JSON.parse(localStorage.getItem("language")) || "en";
    if (language == "ru") {
        title.textContent = "Настройки";
        dailyTargetText.textContent = "Дневная цель потребления:";
        selectLabels[0].textContent = "Единицы измерения:";
        selectLabels[1].textContent = "Внешний вид:";
        selectLabels[2].textContent = "Язык:";
        selectOptions[0].textContent = "светлый";
        selectOptions[1].textContent = "тёмный";
    } else if (language == "en") {
        title.textContent = "Settings";
        dailyTargetText.textContent = "Daily consumption target:";
        selectLabels[0].textContent = "Units:";
        selectLabels[1].textContent = "Appearance:";
        selectLabels[2].textContent = "Language:";
        selectOptions[0].textContent = "light";
        selectOptions[1].textContent = "dark";
    } else if (language == "es") {
        title.textContent = "Ajustes";
        dailyTargetText.textContent = "Meta de consumo diario:";
        selectLabels[0].textContent = "Unidades:";
        selectLabels[1].textContent = "Apariencia:";
        selectLabels[2].textContent = "Idioma:";
        selectOptions[0].textContent = "claro";
        selectOptions[1].textContent = "oscuro";
    }
}

dailyTargetInput.addEventListener("input", () => {
    currentTarget.textContent = dailyTargetInput.value + " ml";
});

dailyTargetInput.addEventListener("change", () => {
    localStorage.setItem("dailyTarget", JSON.stringify(dailyTargetInput.value));
});

themeSelect.addEventListener("change", () => {
    localStorage.setItem("colorTheme", JSON.stringify(themeSelect.value));
    changeColorTheme();
});

languageSelect.addEventListener("change", () => {
    localStorage.setItem("language", JSON.stringify(languageSelect.value));
    changeLanguage();
});

languageSelect.value = JSON.parse(localStorage.getItem("language")) || "en";
themeSelect.value = JSON.parse(localStorage.getItem("colorTheme")) || "light";
dailyTargetInput.value = JSON.parse(localStorage.getItem("dailyTarget")) || 3000;
currentTarget.textContent = (JSON.parse(localStorage.getItem("dailyTarget")) || "3000") + " ml";
changeColorTheme();
changeLanguage();
