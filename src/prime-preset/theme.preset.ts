import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
// import * as components from './components.json';
// import * as primitive from './primitive.json';
// import * as semantic from './semantic.json';

import components from './components';
import primitive from './primitive';
import semantic from './semantic';

const Preset = definePreset(Aura, { components, primitive, semantic });

export default Preset;
