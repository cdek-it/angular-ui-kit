const fs = require('fs');
const { execSync } = require('child_process');

// Название темы должно совпадать с названием файла.
// Например: для темы light-primary файл должен называться ek5-light-primary.scss
const THEMES = {
    LIGHT_PRIMARY: 'light-primary',
    LIGHT_SECONDARY: 'light-secondary',
    DARK_PRIMARY: 'dark-primary',
    DARK_SECONDARY: 'dark-secondary'
};

const CSS_DIST_DIR = './dist-css/css';
const themes = Object.values(THEMES);

async function buildTheme(theme) {
    const path = `${CSS_DIST_DIR}/${theme}-theme.css`;
    const pathMin = `${CSS_DIST_DIR}/${theme}-theme.min.css`;
    const brandPath = `${CSS_DIST_DIR}/brand-${theme}-theme.css`;
    const brandPathMin = `${CSS_DIST_DIR}/brand-${theme}-theme.min.css`;

    const commands = [
        // ek5
        `sass --style=expanded ./primeng-sass-theme/themes/ek5/ek5-${theme}.scss | postcss -o src/assets/components/themes/ek5-${theme}/theme.css`,
        `sass --style=compressed ./primeng-sass-theme/themes/ek5/ek5-${theme}.scss | postcss -o src/assets/components/themes/ek5-${theme}/theme.min.css`,
        `copyfiles -f src/assets/components/themes/ek5-${theme}/theme.css ${path}`,
        `copyfiles -f src/assets/components/themes/ek5-${theme}/theme.min.css ${pathMin}`,
        // brand
        `sass --style=expanded ./primeng-sass-theme/themes/brand/brand-${theme}.scss | postcss -o src/assets/components/themes/brand-${theme}/theme.css`,
        `sass --style=compressed ./primeng-sass-theme/themes/brand/brand-${theme}.scss | postcss -o src/assets/components/themes/brand-${theme}/theme.min.css`,
        `copyfiles -f src/assets/components/themes/brand-${theme}/theme.css ${CSS_DIST_DIR}/brand-${theme}-theme.css`,
        `copyfiles -f src/assets/components/themes/brand-${theme}/theme.min.css ${CSS_DIST_DIR}/brand-${theme}-theme.min.css`
    ];
    console.log(`Building ${theme} theme...`);
    execSync(commands.join(' && '), { stdio: 'inherit' });
}

function watchTheme(theme) {
    const command = `sass --watch ./primeng-sass-theme/themes/ek5/ek5-${theme}.scss:src/assets/components/themes/ek5-${theme}/theme.css ./primeng-sass-theme/themes/brand/brand-${theme}.scss:src/assets/components/themes/brand-${theme}/theme.css`;
    console.log(`Watching ${theme} theme...`);
    execSync(command, { stdio: 'inherit' });
}

function clearDir() {
    console.log(`Clear css dir...`);
    fs.rmSync(CSS_DIST_DIR, { recursive: true, force: true });
    fs.mkdirSync(CSS_DIST_DIR);
}
async function buildAllThemes() {
    clearDir();
    for (const theme of themes) {
        await buildTheme(theme);
    }
    console.log('All themes built successfully!');
}

function watchAllThemes() {
    const watchCommands = themes
        .map((theme) => `./primeng-sass-theme/themes/ek5/ek5-${theme}.scss:src/assets/components/themes/ek5-${theme}/theme.css ./primeng-sass-theme/themes/brand/brand-${theme}.scss:src/assets/components/themes/brand-${theme}/theme.css`)
        .join(' ');
    const command = `sass --watch ${watchCommands}`;
    console.log('Watching all themes...');
    execSync(command, { stdio: 'inherit' });
}

const action = process.argv[2];
const theme = process.argv[3];

/**
 * Обработчик действий по работе с темами
 * @param action может быть или build, или watch
 * @param theme название темы. Может отсутствовать
 */
async function handleThemeAction(action, theme) {
    const actionMap = {
        build: { single: buildTheme, all: buildAllThemes },
        watch: { single: watchTheme, all: watchAllThemes }
    };

    if (!actionMap[action]) {
        console.error('Error: Invalid action. Use "build" or "watch".');
        process.exit(1);
    }

    // Если не передали название темы, то собираем все
    if (!theme) {
        await actionMap[action].all();
        return;
    }

    // Если передали название темы
    if (themes.includes(theme)) {
        await actionMap[action].single(theme);
    } else {
        console.error(`Error: Theme "${theme}" not found. Available themes are: ${themes.join(', ')}`);
        process.exit(1);
    }
}

handleThemeAction(action, theme);
