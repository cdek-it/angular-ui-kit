import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import docJson from '../documentation.json';

import '!style-loader!css-loader!postcss-loader!sass-loader!../src/styles.scss';

import { provideAnimations } from '@angular/platform-browser/animations';

setCompodocJson(docJson);

const THEMES = {
  'ek5-light-primary': 'assets/themes/ek5-light-primary/theme.css',
  'ek5-dark-primary': 'assets/themes/ek5-dark-primary/theme.css',
  'ek5-light-secondary': 'assets/themes/ek5-light-secondary/theme.css',
  'ek5-dark-secondary': 'assets/themes/ek5-dark-secondary/theme.css',
  'brand-light-primary': 'assets/themes/brand-light-primary/theme.css',
  'brand-dark-primary': 'assets/themes/brand-dark-primary/theme.css',
  'brand-light-secondary': 'assets/themes/brand-light-secondary/theme.css',
  'brand-dark-secondary': 'assets/themes/brand-dark-secondary/theme.css',
};

// функция переключения темы
function setTheme(theme: keyof typeof THEMES) {
  const id = 'storybook-theme';
  let linkTag = document.getElementById(id) as HTMLLinkElement | null;

  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.id = id;
    linkTag.rel = 'stylesheet';
    document.head.appendChild(linkTag);
  }

  linkTag.href = THEMES[theme];
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    (storyFn, context) => {
      const theme = context.globals?.['theme'] || 'ek5-light-primary';

      // Логика подмены <link>
      setTheme(theme as keyof typeof THEMES);

      return storyFn();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'ek5-light-primary',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'ek5-light-primary', title: 'ek5-light-primary' },
          { value: 'ek5-dark-primary', title: 'ek5-dark-primary' },
          { value: 'ek5-light-secondary', title: 'ek5-light-secondary' },
          { value: 'ek5-dark-secondary', title: 'ek5-dark-secondary' },
          { value: 'brand-light-primary', title: 'brand-light-primary' },
          { value: 'brand-dark-primary', title: 'brand-dark-primary' },
          { value: 'brand-light-secondary', title: 'brand-light-secondary' },
          { value: 'brand-dark-secondary', title: 'brand-dark-secondary' },
        ],
      },
    },
  },
};

export default preview;
