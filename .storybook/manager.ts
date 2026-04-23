import { addons } from 'storybook/manager-api';

addons.setConfig({
  layoutCustomisations: {
    showToolbar(state, defaultValue) {
      if (state.viewMode === 'docs') {
        return false;
      }
      return defaultValue;
    },
  },
});
