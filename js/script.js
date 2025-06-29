"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
    // HTML
    const htmlBlock = document.documentElement;

    // Получаем сохраненную тему
    const saveUserTheme = localStorage.getItem('user-theme');

    // Работа с системными настройками
    let userTheme;
    if (window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });

    //Смена темы по клику
    const themeButton = document.querySelector('.page__theme');
    const resetButton = document.querySelector('.page__reset');
    if (themeButton) {
        themeButton.addEventListener("click", function (e) {
            resetButton.classList.add('active');
            changeTheme(true);
        });
    }
    if (resetButton) {
        resetButton.addEventListener("click", function (e) {
            resetButton.classList.remove('active');
            localStorage.setItem('user-theme', '');
        });
    }

    //Функция добавления класса теме
function setThemeClass() {
    if (saveUserTheme) {
        htmlBlock.classList.add(saveUserTheme)
        resetButton.classList.add('active');
    }else {
        htmlBlock.classList.add(userTheme);
    }
    }
    //Добавляем класс темы
    setThemeClass();

    //Функция смены темы
function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
    let newTheme;

    if (currentTheme === 'light') {
        newTheme = 'dark';
    } else if (currentTheme === 'dark') {
        newTheme = 'light';
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
}
}

