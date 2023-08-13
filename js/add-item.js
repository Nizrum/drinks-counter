const modal = document.querySelector(".add-popup");
const openModalButton = document.querySelector(".main__add-button");
const closeModalButton = document.querySelector(".add-popup__cancel-button");
const addButton = document.querySelector(".add-popup__add-button");
const plug = document.querySelector(".plug");
const recentDrinksSection = document.querySelector(".recent-drinks");
const drinksList = document.querySelector(".recent-drinks__list");
const typeSelect = document.querySelector(".add-popup__select_type");
const mlVolumeSelect = document.querySelector(".add-popup__select_ml");
const ozVolumeSelect = document.querySelector(".add-popup__select_oz");

function addDrink(type, volume, units, time) {
    plug.classList.add("plug_hidden");
    recentDrinksSection.classList.remove("recent-drinks_hidden");
    drinksList.insertAdjacentHTML(
        "beforeend",
        `
        <li class="recent-drinks__drink drink">
            <img src="images/${type.replace(/ /g, "-")}.svg" alt="${type} icon" class="drink__image">
            <div class="drink__info">
                <h3 class="drink__title">${type[0].toUpperCase() + type.slice(1)}</h3>
                <p class="drink__time">${String(time.getHours()) + ":" + String(time.getMinutes()).padStart(2, "0")}</p>
            </div>
            <p class="drink__amount">${volume} ${units}</p>
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
}

closeModalButton.addEventListener("click", () => {
    modal.close();
});

openModalButton.addEventListener("click", () => {
    modal.showModal();
});

addButton.addEventListener("click", () => {
    addDrink(typeSelect.value, mlVolumeSelect.value, "ml", new Date());
    modal.close();
});

drinksList.addEventListener("click", (event) => {
    if (event.target.closest(".drink__remove-button")) {
        event.target.closest(".drink").remove();
        if (drinksList.innerHTML.trim() == "") {
            plug.classList.remove("plug_hidden");
            recentDrinksSection.classList.add("recent-drinks_hidden");
        }
    }
});
