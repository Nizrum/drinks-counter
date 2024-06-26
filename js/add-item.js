const body = document.querySelector(".body");
const modal = document.querySelector(".add-popup");
const openModalButton = document.querySelector(".main__add-button");
const closeModalButton = document.querySelector(".add-popup__cancel-button");
const addButton = document.querySelector(".add-popup__add-button");
const addPopupText = document.querySelector(".add-popup__text");
const drinkTypeOptions = document.querySelectorAll(".add-popup__option_type");
const plug = document.querySelector(".plug");
const plugText = document.querySelector(".plug__text");
const mainStatsSection = document.querySelector(".main__stats");
const recentDrinksSection = document.querySelector(".recent-drinks");
const recentDrinksTitle = document.querySelector(".recent-drinks__title");
const drinksList = document.querySelector(".recent-drinks__list");
const typeSelect = document.querySelector(".add-popup__select_type");
const mlVolumeSelect = document.querySelector(".add-popup__select_volume");
const progressContainer = document.querySelector(".progress-bar");
const progressBar = document.querySelector(".progress-bar__bar_total");
const progressBarWater = document.querySelector(".progress-bar__bar_water");
const progressCurrentVolume = document.querySelector(".progress-bar__current-volume");
const progressTargetVolume = document.querySelector(".progress-bar__target-volume");
const progressUnits = document.querySelector(".progress-bar__units");
const dateInput = document.querySelector(".main__date-input");
const caloriesAmountStats = document.querySelector(".statistic__amount_calories");
const caffeineAmountStats = document.querySelector(".statistic__amount_caffeine");
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
const caloriesAmounts = {
    water: 0,
    "black tea": 1,
    "green tea": 1,
    coffee: 1,
    juice: 45,
    lemonade: 30,
    kompot: 55,
    milk: 60,
    "mineral water": 0,
    "decaf coffee": 1,
    cacao: 85,
    "hot chocolate": 85,
    yogurt: 70,
    kefir: 51,
    kvass: 32,
    kissel: 50,
    "energy drink": 45,
    beer: 40,
    "non-alcoholic beer": 20,
    wine: 80,
    "strong alcohol": 220,
};
const caffeineAmounts = {
    water: 0,
    "black tea": 30,
    "green tea": 25,
    coffee: 65,
    juice: 0,
    lemonade: 10,
    kompot: 0,
    milk: 60,
    "mineral water": 0,
    "decaf coffee": 1,
    cacao: 7,
    "hot chocolate": 2,
    yogurt: 0,
    kefir: 0,
    kvass: 0,
    kissel: 0,
    "energy drink": 32,
    beer: 0,
    "non-alcoholic beer": 0,
    wine: 0,
    "strong alcohol": 0,
};
const waterAmounts = {
    water: 1,
    "black tea": 0.85,
    "green tea": 0.85,
    coffee: 0.8,
    juice: 0.9,
    lemonade: 0.6,
    kompot: 0.7,
    milk: 0.8,
    "mineral water": 1,
    "decaf coffee": 0.85,
    cacao: 0.65,
    "hot chocolate": 0.4,
    yogurt: 0.5,
    kefir: 0.6,
    kvass: 0.7,
    kissel: 0.6,
    "energy drink": 0.4,
    beer: -0.6,
    "non-alcoholic beer": 0.6,
    wine: -1.6,
    "strong alcohol": -3.5,
};
let now = new Date();
let allDrinks = [];
let currentID = 0;
let dailyTarget = 3000;
let colorTheme = "light";
let language = "en";
let units = "ml";

function renderDrinks(drinks) {
    drinksList.innerHTML = "";
    if (drinks.length != 0) {
        plug.classList.add("plug_hidden");
        recentDrinksSection.classList.remove("recent-drinks_hidden");
        mainStatsSection.classList.remove("main__stats_hidden");
        let totalVolume = 0;
        let waterVolume = 0;
        let totalCalories = 0;
        let totalCaffeine = 0;
        for (let { id, type, mlVolume, ozVolume, time } of drinks) {
            drinksList.insertAdjacentHTML(
                "afterbegin",
                `
                <li class="recent-drinks__drink drink" data-id="${id}">
                    <div class="drink__image-container">
                        <img src="images/${type.replace(/ /g, "-")}.svg" alt="${type} icon" class="drink__image">
                    </div>
                    <div class="drink__info">
                        <h3 class="drink__title">${drinksNamesDictionary[type][language]}</h3>
                        <p class="drink__time">${time}</p>
                    </div>
                    <p class="drink__amount">${units == "ml" ? mlVolume : ozVolume} ${units}</p>
                    <button class="drink__edit-button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 16.0672V19.4445C0 19.7556 0.244411 20 0.55548 20H3.9328C4.07722 20 4.22165 19.9445 4.32164 19.8334L16.4533 7.71278L12.2872 3.54668L0.166644 15.6673C0.0555481 15.7784 0 15.9117 0 16.0672ZM19.6751 4.491C19.7781 4.38822 19.8598 4.26613 19.9156 4.13174C19.9713 3.99734 20 3.85327 20 3.70777C20 3.56227 19.9713 3.4182 19.9156 3.2838C19.8598 3.1494 19.7781 3.02732 19.6751 2.92454L17.0755 0.324894C16.9727 0.221904 16.8506 0.140195 16.7162 0.0844457C16.5818 0.0286961 16.4377 0 16.2922 0C16.1467 0 16.0027 0.0286961 15.8683 0.0844457C15.7339 0.140195 15.6118 0.221904 15.509 0.324894L13.4759 2.35795L17.642 6.52405L19.6751 4.491Z"
                                fill="#222222" />
                        </svg>
                    </button>
                    <button class="drink__remove-button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.98203 0.490895L10 7.50887L16.9816 0.527257C17.1358 0.363112 17.3216 0.231802 17.5278 0.1412C17.734 0.0505982 17.9564 0.00257146 18.1816 0C18.6638 0 19.1262 0.191552 19.4672 0.532517C19.8082 0.873482 19.9997 1.33593 19.9997 1.81813C20.0039 2.04103 19.9626 2.26246 19.8782 2.4688C19.7938 2.67515 19.6681 2.86207 19.5088 3.01809L12.4363 9.9997L19.5088 17.0722C19.8085 17.3654 19.9842 17.7624 19.9997 18.1813C19.9997 18.6635 19.8082 19.1259 19.4672 19.4669C19.1262 19.8079 18.6638 19.9994 18.1816 19.9994C17.9499 20.009 17.7187 19.9703 17.5027 19.8858C17.2868 19.8013 17.0907 19.6728 16.9271 19.5085L10 12.4905L3.00021 19.4903C2.84659 19.649 2.66306 19.7757 2.46023 19.8631C2.25739 19.9504 2.03926 19.9968 1.81842 19.9994C1.33623 19.9994 0.873778 19.8079 0.532813 19.4669C0.191848 19.1259 0.000295822 18.6635 0.000295822 18.1813C-0.00394313 17.9584 0.0374137 17.737 0.121828 17.5306C0.206243 17.3243 0.331935 17.1373 0.49119 16.9813L7.56371 9.9997L0.49119 2.92719C0.191536 2.63403 0.0158219 2.23705 0.000295822 1.81813C0.000295822 1.33593 0.191848 0.873482 0.532813 0.532517C0.873778 0.191552 1.33623 0 1.81842 0C2.25477 0.00545438 2.67294 0.181813 2.98203 0.490895Z"
                                fill="#222222" />
                        </svg>
                    </button>
                </li>
            `
            );
            totalVolume += units == "ml" ? mlVolume : ozVolume;
            waterVolume += (units == "ml" ? mlVolume : ozVolume) * waterAmounts[type];
            totalCalories += Math.round((mlVolume / 100) * caloriesAmounts[type]);
            totalCaffeine += Math.round((mlVolume / 100) * caffeineAmounts[type]);
            caloriesAmountStats.textContent = totalCalories;
            caffeineAmountStats.textContent = totalCaffeine;
        }
        changeProgressBar(Math.round(totalVolume), Math.round(waterVolume));
    } else {
        plug.classList.remove("plug_hidden");
        recentDrinksSection.classList.add("recent-drinks_hidden");
        mainStatsSection.classList.add("main__stats_hidden");
        changeProgressBar(0, 0);
    }
}

function addDrink(type, volume, time) {
    let newDrink = {};
    newDrink.id = currentID;
    newDrink.type = type;
    newDrink.time = `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`;
    if (units == "ml") {
        newDrink.mlVolume = volume;
        newDrink.ozVolume = Math.round(volume / 30);
    } else {
        newDrink.mlVolume = volume * 30;
        newDrink.ozVolume = volume;
    }
    allDrinks.push(newDrink);
    currentID++;
    renderDrinks(allDrinks);
    saveToLocalStorage(allDrinks);
}

function removeDrink(id) {
    allDrinks = allDrinks.filter((drink) => drink.id !== id);
    renderDrinks(allDrinks);
    saveToLocalStorage(allDrinks);
}

function changeDrink(id, type, volume) {
    for (let drink of allDrinks) {
        if (drink.id == id) {
            drink.type = type;
            if (units == "ml") {
                drink.mlVolume = volume;
                drink.ozVolume = Math.round(volume / 30);
            } else {
                drink.mlVolume = volume * 30;
                drink.ozVolume = volume;
            }
            break;
        }
    }
    renderDrinks(allDrinks);
    saveToLocalStorage(allDrinks);
}

function changeProgressBar(totalVolume, waterVolume) {
    progressTargetVolume.textContent = dailyTarget;
    progressCurrentVolume.textContent = waterVolume;
    progressUnits.textContent = units;
    let newWidth = (totalVolume / dailyTarget) * progressContainer.clientWidth;
    progressBar.style.width =
        String(newWidth <= progressContainer.clientWidth ? newWidth : progressContainer.clientWidth) + "px";
    newWidth = waterVolume < 0 ? 0 : (waterVolume / dailyTarget) * progressContainer.clientWidth;
    progressBarWater.style.width =
        String(newWidth <= progressContainer.clientWidth ? newWidth : progressContainer.clientWidth) + "px";
}

function getDataFromLocalStorage() {
    allDrinks = [];
    currentID = 0;
    dailyTarget = JSON.parse(localStorage.getItem("dailyTarget")) || 3000;
    colorTheme = JSON.parse(localStorage.getItem("colorTheme")) || "light";
    language = JSON.parse(localStorage.getItem("language")) || "en";
    units = JSON.parse(localStorage.getItem("units")) || "ml";

    if (localStorage.getItem("drinksData")) {
        let selectedDayData = JSON.parse(localStorage.getItem("drinksData"))[dateInput.value];
        if (selectedDayData) {
            allDrinks = selectedDayData["drinksList"];
            currentID = selectedDayData["currentID"];
        }
    }
}

function saveToLocalStorage(drinks) {
    let data = JSON.parse(localStorage.getItem("drinksData")) || {};
    data[dateInput.value] = {};
    data[dateInput.value]["drinksList"] = drinks;
    data[dateInput.value]["currentID"] = currentID;
    let totalVolumeMl = 0;
    let totalVolumeOz = 0;
    let waterVolumeMl = 0;
    let waterVolumeOz = 0;
    let totalCalories = 0;
    let totalCaffeine = 0;
    for (let drink of drinks) {
        totalVolumeMl += drink.mlVolume;
        totalVolumeOz += drink.ozVolume;
        waterVolumeMl += drink.mlVolume * waterAmounts[drink.type];
        waterVolumeOz += drink.ozVolume * waterAmounts[drink.type];
        totalCalories += (drink.mlVolume / 100) * caloriesAmounts[drink.type];
        totalCaffeine += (drink.mlVolume / 100) * caffeineAmounts[drink.type];
    }
    data[dateInput.value]["totalVolumeMl"] = totalVolumeMl;
    data[dateInput.value]["totalVolumeOz"] = totalVolumeOz;
    data[dateInput.value]["waterVolumeMl"] = waterVolumeMl;
    data[dateInput.value]["waterVolumeOz"] = waterVolumeOz;
    data[dateInput.value]["caloriesAmount"] = totalCalories;
    data[dateInput.value]["caffeineAmount"] = totalCaffeine;
    localStorage.setItem("drinksData", JSON.stringify(data));
}

closeModalButton.addEventListener("click", () => {
    modal.close();
    addButton.dataset.role = "add";
    if (language == "en") {
        addButton.textContent = "Add";
    } else if (language == "ru") {
        addButton.textContent = "Добавить";
    } else if (language == "es") {
        addButton.textContent = "Agregar";
    }
});

openModalButton.addEventListener("click", () => {
    modal.showModal();
});

addButton.addEventListener("click", () => {
    if (addButton.dataset.role == "edit") {
        addButton.dataset.role = "add";
        if (language == "en") {
            addButton.textContent = "Add";
        } else if (language == "ru") {
            addButton.textContent = "Добавить";
        } else if (language == "es") {
            addButton.textContent = "Agregar";
        }
        changeDrink(addButton.dataset.editID, typeSelect.value, Number(mlVolumeSelect.value));
    } else {
        addDrink(typeSelect.value, Number(mlVolumeSelect.value), new Date());
    }
    modal.close();
});

drinksList.addEventListener("click", (event) => {
    let target = event.target;
    if (target.closest(".drink__remove-button")) {
        removeDrink(Number(target.closest(".drink").dataset.id));
    }
    if (target.closest(".drink__edit-button")) {
        addButton.dataset.role = "edit";
        if (language == "en") {
            addButton.textContent = "Save";
        } else if (language == "ru") {
            addButton.textContent = "Сохранить";
        } else if (language == "es") {
            addButton.textContent = "Guardar";
        }
        let currentDrink = allDrinks.filter((drink) => drink.id == target.closest(".drink").dataset.id)[0];
        typeSelect.value = currentDrink.type;
        mlVolumeSelect.value = units == "ml" ? currentDrink.mlVolume : currentDrink.ozVolume;
        if (mlVolumeSelect.value == "") {
            mlVolumeSelect.value = units == "ml" ? 20 : 1;
        }
        addButton.dataset.editID = currentDrink.id;
        modal.showModal();
    }
});

dateInput.addEventListener("change", () => {
    getDataFromLocalStorage();
    renderDrinks(allDrinks);
});

dateInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(
    2,
    "0"
)}`;
getDataFromLocalStorage();
renderDrinks(allDrinks);

if (colorTheme == "dark") {
    body.classList.add("body_dark");
} else {
    body.classList.remove("body_dark");
}

if (language == "ru") {
    plugText.textContent = "Вы ещё не добавили напитки";
    openModalButton.textContent = "Добавить напиток";
    addPopupText.textContent = "Выберите напиток и объём";
    addButton.textContent = "Добавить";
    recentDrinksTitle.textContent = "Недавние напитки";
    closeModalButton.textContent = "Отменить";
    drinkTypeOptions.forEach((drink) => {
        drink.textContent = drinksNamesDictionary[drink.value].ru;
    });
} else if (language == "en") {
    plugText.textContent = "You haven't added any drinks yet";
    openModalButton.textContent = "Add a drink";
    addPopupText.textContent = "Select the drink and the volume";
    addButton.textContent = "Add";
    recentDrinksTitle.textContent = "Recent drinks";
    closeModalButton.textContent = "Cancel";
    drinkTypeOptions.forEach((drink) => {
        drink.textContent = drinksNamesDictionary[drink.value].en;
    });
} else if (language == "es") {
    plugText.textContent = "Aún no se agregan bebidas";
    openModalButton.textContent = "Agregar una bebida";
    addPopupText.textContent = "Seleccione el tipo de bebida y el volumen";
    addButton.textContent = "Agregar";
    recentDrinksTitle.textContent = "Bebidas recientes";
    closeModalButton.textContent = "Cancelar";
    drinkTypeOptions.forEach((drink) => {
        drink.textContent = drinksNamesDictionary[drink.value].es;
    });
}

if (units == "ml") {
    mlVolumeSelect.innerHTML = `
        <option value="20">20 ml</option>
        <option value="50">50 ml</option>
        <option value="100">100 ml</option>
        <option value="150">150 ml</option>
        <option value="200">200 ml</option>
        <option value="250">250 ml</option>
        <option value="300">300 ml</option>
        <option value="330">330 ml</option>
        <option value="350">350 ml</option>
        <option value="400">400 ml</option>
        <option value="450">450 ml</option>
        <option value="500">500 ml</option>
        <option value="600">600 ml</option>
        <option value="700">700 ml</option>
        <option value="800">800 ml</option>
        <option value="900">900 ml</option>
        <option value="1000">1000 ml</option>
        <option value="1500">1500 ml</option>
        <option value="2000">2000 ml</option>
    `;
} else {
    mlVolumeSelect.innerHTML = `
        <option value="1">1 oz</option>
        <option value="2">2 oz</option>
        <option value="3">3 oz</option>
        <option value="4">4 oz</option>
        <option value="5">5 oz</option>
        <option value="6">6 oz</option>
        <option value="7">7 oz</option>
        <option value="8">8 oz</option>
        <option value="10">10 oz</option>
        <option value="11">11 oz</option>
        <option value="12">12 oz</option>
        <option value="13">13 oz</option>
        <option value="15">15 oz</option>
        <option value="16">16 oz</option>
        <option value="20">20 oz</option>
        <option value="24">24 oz</option>
        <option value="28">28 oz</option>
        <option value="30">30 oz</option>
        <option value="32">32 oz</option>
        <option value="64">64 oz</option>
        <option value="128">128 oz</option>
    `;
}
