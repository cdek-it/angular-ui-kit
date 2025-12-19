import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import components from './components';
import primitive from './primitive';
import semantic from './semantic';
import css from './css';

const Preset = definePreset(Aura, { components, primitive, semantic, css });

export default Preset;
