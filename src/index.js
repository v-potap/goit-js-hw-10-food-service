import './styles.css';
import menuTemplate from './templates/menu-item.hbs';

const menuItems = module.require('./menu.json');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const domRefs = {
  body: document.querySelector('body'),
  menu: document.querySelector('#menu'),
  menuTemplate: document.querySelector('#menu-template'),
  chbSwitchTheme: document.querySelector('#theme-switch-control'),
};

const currentSettings = initSettings(
  JSON.parse(localStorage.getItem('settings')),
);

domRefs.chbSwitchTheme.addEventListener('change', handleThemeSwitch);
window.addEventListener('beforeunload', handleUnload);

applySettings(currentSettings, domRefs);

menuItems.forEach(element => {
  // const template = Handlebars.compile(domRefs.menuTemplate.innerHTML.trim());
  const markup = menuTemplate(element); // html разметка с подставленным значениями
  domRefs.menu.insertAdjacentHTML('afterBegin', markup);
});

function handleThemeSwitch(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  if (domRefs.chbSwitchTheme.checked) {
    switchThemeToDark();
  } else {
    switchThemeToLight();
  }
}

function handleUnload(e) {
  localStorage.setItem('settings', JSON.stringify(currentSettings));
}

function initSettings(localSettings) {
  let currentSettings = localSettings === null ? {} : localSettings;

  if (!currentSettings.hasOwnProperty('theme')) {
    currentSettings.theme = Theme.LIGHT;
  } else {
    currentSettings.theme = localSettings.theme;
  }
  return currentSettings;
}

function applySettings(s, d) {
  if (s.theme === Theme.DARK && !d.chbSwitchTheme.checked) {
    d.chbSwitchTheme.checked = true;
    switchThemeToDark();
  }
}

function switchThemeToDark() {
  domRefs.body.classList.add(Theme.DARK);
  domRefs.body.classList.remove(Theme.LIGHT);
  currentSettings.theme = Theme.DARK;
}

function switchThemeToLight() {
  domRefs.body.classList.add(Theme.LIGHT);
  domRefs.body.classList.remove(Theme.DARK);
  currentSettings.theme = Theme.LIGHT;
}
