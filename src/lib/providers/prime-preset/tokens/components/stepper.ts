export const stepperCss = ({ dt }: { dt: (token: string) => string }): string => `

/* Caption - gap */
.p-stepper .p-step-title {
  display: flex;
  flex-direction: column;
  gap: ${dt('stepper.extend.extCaption.gap')};
  line-height: ${dt('stepper.extend.fonts_lineHeight_200')};
  align-items: flex-start;
  text-align: left;
}

/* Caption - secondary text */
.p-stepper .p-step-title .caption-secondary {
  display: flex;
  justify-content: flex-start;
  font-family: ${dt('stepper.extend.fonts_fontFamily_base')};
  font-size: ${dt('stepper.extend.fonts_fontSize_200')};
  font-weight: ${dt('stepper.extend.fonts_fontWeight_regular')};
  line-height: normal;
  color: ${dt('stepper.extend.text_mutedColor')};
}

/* Номер шага */
.p-stepper .p-step-number {
  font-family: ${dt('stepper.extend.fonts_fontFamily_base')};
  font-size: ${dt('stepper.extend.fonts_fontSize_300')};
  font-weight: ${dt('stepper.extend.fonts_fontWeight_medium')};
  line-height: ${dt('stepper.extend.fonts_lineHeight_150')};
}

/* Border для номера шага */
.p-stepper .p-step-number.p-step-number {
  border-width: ${dt('stepper.extend.extStepNumber.borderWidth')};
}

/* Invalid состояние для step-number - только когда активен */
.p-stepper .step-invalid.p-step-active .p-step-number {
  background: ${dt('stepper.extend.extStepNumber.invalidBackground')};
  color: ${dt('stepper.extend.extStepNumber.invalidColor')};
  border-color: ${dt('stepper.extend.extStepNumber.invalidBorderColor')};
}

/* Step-number с иконкой */
.p-stepper .p-step-number:has(i) {
  background: ${dt('stepper.extend.background_transparent')};
  border-color: ${dt('stepper.extend.background_transparent')};
}

/* Размер иконок в step-number */
.p-stepper .p-step-number i {
  font-size: ${dt('stepper.extend.extStepNumber.iconSize')};
}

/* Активное состояние - иконка в цвет фона */
.p-stepper .p-step-active .p-step-number i {
  color: ${dt('stepper.stepNumber.activeBackground')};
}

/* Прозрачный фон для панелей */
.p-stepper .p-steppanel {
  background: ${dt('stepper.extend.background_transparent')};
}
`;
