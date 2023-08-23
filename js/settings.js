let body = document.querySelector(".body");
let dailyTargetInput = document.querySelector(".daily-target__input");
let currentTarget = document.querySelector(".daily-target__current-value");
let themeSelect = document.getElementById("appearance-select");

function changeColorTheme() {
    if (JSON.parse(localStorage.getItem("colorTheme")) == "dark") {
        body.classList.add("body_dark");
    } else {
        body.classList.remove("body_dark");
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

themeSelect.value = JSON.parse(localStorage.getItem("colorTheme")) || "light";
dailyTargetInput.value = JSON.parse(localStorage.getItem("dailyTarget")) || 3000;
currentTarget.textContent = (JSON.parse(localStorage.getItem("dailyTarget")) || "3000") + " ml";
changeColorTheme();
