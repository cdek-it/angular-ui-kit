import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

const template = `
<div class="p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <extra-badge value="8"></extra-badge>
      <extra-badge value="8" size="large"></extra-badge>
      <extra-badge value="8" size="xlarge"></extra-badge>
    </div>
    <div class="flex gap-4 items-center">
      <extra-badge value="99+"></extra-badge>
      <extra-badge value="99+" size="large"></extra-badge>
      <extra-badge value="99+" size="xlarge"></extra-badge>
    </div>
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template,
  styles
})
export class BadgeSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-badge-sizes></app-badge-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Все доступные размеры: base, large, xlarge — с одним символом (круг) и с переполнением `99+` (пилюля).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraBadgeComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraBadgeComponent],
  template: \`${template}\`
})
export class BadgeSizesComponent {}
        `
      }
    }
  }
};
