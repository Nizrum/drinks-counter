let dailyTargetInput = document.querySelector('.daily-target__input');
let currentTarget = document.querySelector('.daily-target__current-value');

dailyTargetInput.addEventListener('input', () => {
    currentTarget.textContent = dailyTargetInput.value + ' ml';
});

dailyTargetInput.addEventListener('change', () => {
    localStorage.setItem('dailyTarget', JSON.stringify(dailyTargetInput.value));
});

dailyTargetInput.value = JSON.parse(localStorage.getItem('dailyTarget')) || 3000;
currentTarget.textContent = (JSON.parse(localStorage.getItem('dailyTarget')) || '3000') + ' ml';