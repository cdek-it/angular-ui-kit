import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="flex flex-col gap-4">
  <div class="flex gap-2">
    @for (filter of filters(); track filter) {
      <extra-chip [label]="filter" [removable]="true" (onRemove)="remove(filter)"></extra-chip>
    } @empty {
      <span class="text-sm">Все фильтры удалены</span>
    }
  </div>

  <div class="flex gap-3 items-center">
    <extra-button label="Вернуть" icon="ti ti-refresh" size="small" (click)="reset()"></extra-button>
    <span class="text-sm">Лог onRemove: {{ log().length ? log().join(' → ') : '—' }}</span>
  </div>
</div>
`;
const styles = '';

const INITIAL_FILTERS = ['Хрупкий груз', 'Москва', 'До двери'];

@Component({
  selector: 'app-chip-removable',
  standalone: true,
  imports: [ExtraChipComponent, ExtraButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ChipRemovableComponent {
  filters = signal<string[]>(INITIAL_FILTERS);
  log = signal<string[]>([]);

  remove(filter: string): void {
    this.filters.update((filters) => filters.filter((item) => item !== filter));
    this.log.update((entries) => [...entries, filter]);
  }

  reset(): void {
    this.filters.set(INITIAL_FILTERS);
    this.log.set([]);
  }
}

export const Removable: StoryObj = {
  render: () => ({
    template: `<app-chip-removable></app-chip-removable>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Чип с кнопкой удаления. Чип не скрывает себя сам — удалением управляет родитель по событию `(onRemove)`.'
      },
      source: {
        language: 'html',
        code: `@for (filter of filters(); track filter) {
  <extra-chip [label]="filter" [removable]="true" (onRemove)="remove(filter)"></extra-chip>
}`
      }
    }
  }
};
