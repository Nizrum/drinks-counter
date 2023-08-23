let body = document.querySelector(".body");

if (JSON.parse(localStorage.getItem("colorTheme")) == "dark") {
    body.classList.add("body_dark");
} else {
    body.classList.remove("body_dark");
}
