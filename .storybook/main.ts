import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src-storybook/**/*.mdx', '../src-storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [{ from: '../src-storybook/assets', to: '/assets' }],
};
export default config;
