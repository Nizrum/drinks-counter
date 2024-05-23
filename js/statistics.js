let body = document.querySelector(".body");
let statsTitle = document.querySelector(".stats__title");
let periodStatsTitle = document.querySelector(".period-stats__title");
let selectOptions = document.querySelectorAll(".select__option");
let frequencyStatsTitle = document.querySelector(".frequency-stats__title");
let frequencyStatsDiagram = document.querySelector(".frequency-stats__diagram");
let periodSelect = document.querySelector(".select__input");
let statsColumns = document.querySelector(".period-stats__columns");
let dayStats = document.querySelector(".day-stats");
let dayStatsList = document.querySelector(".day-stats__list");
let language = JSON.parse(localStorage.getItem("language")) || "en";
let units = JSON.parse(localStorage.getItem("units")) || "ml";
let themeColor = JSON.parse(localStorage.getItem("colorTheme")) == "dark" ? "#222" : "#fff";
let themeTextColor = JSON.parse(localStorage.getItem("colorTheme")) == "dark" ? "#fff" : "#222";
let dailyTarget = JSON.parse(localStorage.getItem("dailyTarget")) || 3000;
const allDrinks = JSON.parse(localStorage.getItem("drinksData"));
const drinksNamesDictionary = {
    water: {
        en: "Water",
        es: "Agua",
        ru: "Вода",
    },
    "black tea": {
        en: "Black tea",
        es: "Té negro",
        ru: "Чёрный чай",
    },
    "green tea": {
        en: "Green tea",
        es: "Té verde",
        ru: "Зелёный чай",
    },
    coffee: {
        en: "Coffee",
        es: "Cáfe",
        ru: "Кофе",
    },
    juice: {
        en: "Juice",
        es: "Jugo",
        ru: "Сок",
    },
    lemonade: {
        en: "Lemonade",
        es: "Limonada",
        ru: "Лимонад",
    },
    kompot: {
        en: "Kompot",
        es: "Compota",
        ru: "Компот",
    },
    milk: {
        en: "Milk",
        es: "Leche",
        ru: "Молоко",
    },
    "mineral water": {
        en: "Mineral water",
        es: "Agua mineral",
        ru: "Минеральная вода",
    },
    "decaf coffee": {
        en: "Decaf coffee",
        es: "Cáfe descafeinado",
        ru: "Кофе без кофеина",
    },
    cacao: {
        en: "Cacao",
        es: "Cacao",
        ru: "Какао",
    },
    "hot chocolate": {
        en: "Hot chocolate",
        es: "Chocolate caliente",
        ru: "Горячий шоколад",
    },
    yogurt: {
        en: "Yogurt",
        es: "Yogur",
        ru: "Йогурт",
    },
    kefir: {
        en: "Kefir",
        es: "Kefir",
        ru: "Кефир",
    },
    kvass: {
        en: "Kvass",
        es: "Kvas",
        ru: "Квас",
    },
    kissel: {
        en: "Kissel",
        es: "Kisel",
        ru: "Кисель",
    },
    "energy drink": {
        en: "Energy drink",
        es: "Bebida energética",
        ru: "Энергетик",
    },
    beer: {
        en: "Beer",
        es: "Cerveza",
        ru: "Пиво",
    },
    "non-alcoholic beer": {
        en: "Non-alcoholic beer",
        es: "Cerveza sin alcohol",
        ru: "Безалкогольное пиво",
    },
    wine: {
        en: "Wine",
        es: "Vino",
        ru: "Вино",
    },
    "strong alcohol": {
        en: "Strong alcohol",
        es: "Alcohol fuerte",
        ru: "Крепкий алкоголь",
    },
};
const weekDaysDictionary = {
    en: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    ru: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function formDrinksDict(daysAmount) {
    drinksDict = {};
    let today = new Date();
    for (let i = 0; i < daysAmount; i++) {
        let currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;
        if (allDrinks[currentDate]) {
            for (let drink of allDrinks[currentDate].drinksList) {
                if (drinksDict[drink.type]) {
                    drinksDict[drink.type] += drink.mlVolume;
                } else {
                    drinksDict[drink.type] = drink.mlVolume;
                }
            }
        }
        today.setDate(today.getDate() - 1);
    }
    return drinksDict;
}

function drawChart() {
    let data = new google.visualization.DataTable();
    data.addColumn("string", "Drink");
    data.addColumn("number", "Volume");
    let drinksDict = formDrinksDict(periodSelect.checked ? 30 : 7);
    let drinksRows = [];
    for (let type in drinksDict) {
        drinksRows.push([drinksNamesDictionary[type][language], drinksDict[type]]);
    }
    data.addRows(drinksRows);

    let options = {
        backgroundColor: themeColor,
        chartArea: { width: "100%", height: "100%" },
        fontName: "Inter",
        legend: { position: "right", textStyle: { color: themeTextColor, fontSize: 14 } },
    };

    let chart = new google.visualization.PieChart(frequencyStatsDiagram);
    chart.draw(data, options);
}

function renderDays() {
    statsColumns.innerHTML = "";
    let today = new Date();
    for (let i = 0; i < (periodSelect.checked ? 30 : 7); i++) {
        let currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;
        let currentVolume = allDrinks[currentDate]
            ? units == "ml"
                ? allDrinks[currentDate]["waterVolumeMl"]
                : allDrinks[currentDate]["waterVolumeOz"]
            : 0;
        statsColumns.insertAdjacentHTML(
            "afterbegin",
            `
            <li class="period-stats__column column" data-date="${currentDate}">
                <div class="column__value">${
                    units == "ml" ? (currentVolume / 1000).toFixed(1) + " L" : String(currentVolume) + " oz"
                }</div>
                <div class="column__bar" style="height: ${
                    currentVolume == 0 ? 3 : currentVolume > dailyTarget ? 75 : (currentVolume / dailyTarget) * 75
                }px"></div>
                <div class="column__date">${weekDaysDictionary[language][today.getDay()]}</div>
            </li>
        `
        );
        today.setDate(today.getDate() - 1);
    }
}

function renderDayStat(date) {
    currentDateStats = allDrinks[date] || {
        totalVolumeMl: 0,
        totalVolumeOz: 0,
        waterVolumeMl: 0,
        waterVolumeOz: 0,
        caloriesAmount: 0,
        caffeineAmount: 0,
    };
    dayStatsList.innerHTML = "";
    dayStatsList.insertAdjacentHTML(
        "afterbegin",
        `
        <li class="day-stats__day-stat day-stat">
            <div class="day-stat__title">${language == 'en' || language == 'es' ? 'Total' : 'Всего'}</div>
            <div class="day-stat__value">${
                units == "ml"
                    ? (currentDateStats.totalVolumeMl / 1000).toFixed(2) + " L"
                    : currentDateStats.totalVolumeOz.toFixed(1) + " oz"
            }</div>
        </li>
        <li class="day-stats__day-stat day-stat">
            <div class="day-stat__title">${language == 'en' ? 'Water' : language == 'es' ? 'Agua' : 'Вода'}</div>
            <div class="day-stat__value">${
                units == "ml"
                    ? (currentDateStats.waterVolumeMl / 1000).toFixed(2) + " L"
                    : currentDateStats.waterVolumeOz.toFixed(1) + " oz"
            }</div>
        </li>
        <li class="day-stats__day-stat day-stat">
            <div class="day-stat__title">${language == 'en' ? 'Calories' : language == 'es' ? 'Calorías' : 'Калории'}</div>
            <div class="day-stat__value">${currentDateStats.caloriesAmount} kcal</div>
        </li>
        <li class="day-stats__day-stat day-stat">
            <div class="day-stat__title">${language == 'en' ? 'Caffeine' : language == 'es' ? 'Cafeína' : 'Кофеин'}</div>
            <div class="day-stat__value">${currentDateStats.caffeineAmount} mg</div>
        </li>
    `
    );
}

periodSelect.addEventListener("click", () => {
    drawChart();
    renderDays();
});

statsColumns.addEventListener("click", (event) => {
    target = event.target.closest(".column");
    if (target) {
        if (target.classList.contains("column_active")) {
            dayStats.classList.remove("day-stats_active");
            target.classList.remove("column_active");
        } else {
            let currentlyActive = document.querySelector(".column_active");
            if (currentlyActive) {
                currentlyActive.classList.remove("column_active");
            }
            target.classList.add("column_active");
            dayStats.classList.add("day-stats_active");
            renderDayStat(target.dataset.date);
        }
    }
});

if (JSON.parse(localStorage.getItem("colorTheme")) == "dark") {
    body.classList.add("body_dark");
} else {
    body.classList.remove("body_dark");
}

if (language == "ru") {
    statsTitle.textContent = "Статистика";
    periodStatsTitle.textContent = "Общее потребление жидкости";
    selectOptions[0].textContent = "Месяц";
    selectOptions[1].textContent = "Неделя";
    frequencyStatsTitle.textContent = "Частота напитков";
} else if (language == "en") {
    statsTitle.textContent = "Statistics";
    periodStatsTitle.textContent = "Total consumption of liquids";
    selectOptions[0].textContent = "Month";
    selectOptions[1].textContent = "Week";
    frequencyStatsTitle.textContent = "Frequency of drinks";
} else if (language == "es") {
    statsTitle.textContent = "Estadísticas";
    periodStatsTitle.textContent = "Consumo total de líquidos";
    selectOptions[0].textContent = "Mes";
    selectOptions[1].textContent = "Semana";
    frequencyStatsTitle.textContent = "Frequencia de bebidas";
}

renderDays();
