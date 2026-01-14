import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import presetTokens from './map-tokens';

const Preset = definePreset(Aura, presetTokens);

export default Preset;
