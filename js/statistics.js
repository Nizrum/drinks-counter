let body = document.querySelector(".body");
let statsTitle = document.querySelector(".stats__title");
let periodStatsTitle = document.querySelector(".period-stats__title");
let selectOptions = document.querySelectorAll(".select__option");
let frequencyStatsTitle = document.querySelector(".frequency-stats__title");
let language = JSON.parse(localStorage.getItem("language")) || "en";

if (JSON.parse(localStorage.getItem("colorTheme")) == "dark") {
    body.classList.add("body_dark");
} else {
    body.classList.remove("body_dark");
}

if (language == "ru") {
    statsTitle.textContent = "Статистика";
    periodStatsTitle.textContent = "Общее потребление жидкости";
    selectOptions[0].textContent = "Неделя";
    selectOptions[1].textContent = "Месяц";
    frequencyStatsTitle.textContent = "Частота напиктов";
} else if (language == "en") {
    statsTitle.textContent = "Statistics";
    periodStatsTitle.textContent = "Total consumption of liquids";
    selectOptions[0].textContent = "Week";
    selectOptions[1].textContent = "Month";
    frequencyStatsTitle.textContent = "Frequency of drinks";
} else if (language == "es") {
    statsTitle.textContent = "Estadísticas";
    periodStatsTitle.textContent = "Consumo total de líquidos";
    selectOptions[0].textContent = "Semana";
    selectOptions[1].textContent = "Mes";
    frequencyStatsTitle.textContent = "Frequencia de bebidas";
}
