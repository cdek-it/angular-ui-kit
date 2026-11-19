import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';
import { ExtraTagComponent, ExtraTagSeverity } from '../../../../lib/components/tag/tag.component';

interface ShipmentRow {
  number: string;
  route: string;
  status: string;
  severity: ExtraTagSeverity;
}

const template = `
<extra-button (click)="visible = true" label="Открыть список"></extra-button>

<extra-dialog header="История отправлений" [(visible)]="visible" size="lg">
  <div class="flex flex-col gap-2">
    @for (row of rows; track row.number) {
      <div class="flex items-center justify-between gap-3 rounded-lg border border-surface-border px-3 py-2">
        <div class="flex flex-col">
          <span class="text-sm font-medium">{{ row.number }}</span>
          <span class="text-xs text-secondary">{{ row.route }}</span>
        </div>
        <extra-tag [severity]="row.severity" [value]="row.status"></extra-tag>
      </div>
    }
  </div>

  <ng-template extraDialogTemplate="footer">
    <extra-button variant="text" label="Закрыть" (click)="visible = false"></extra-button>
    <extra-button label="Скачать акт" (click)="visible = false"></extra-button>
  </ng-template>
</extra-dialog>
`;

@Component({
  selector: 'app-dialog-long-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraButtonComponent, ExtraTagComponent],
  template
})
export class DialogLongListComponent {
  visible = false;

  rows: ShipmentRow[] = [
    { number: 'CDEK-2025-00478312', route: 'Москва → Казань', status: 'в пути', severity: 'info' },
    { number: 'CDEK-2025-00478311', route: 'Казань → Уфа', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478310', route: 'Уфа → Самара', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478309', route: 'Самара → Волгоград', status: 'ожидает', severity: 'warning' },
    { number: 'CDEK-2025-00478308', route: 'Волгоград → Ростов-на-Дону', status: 'в пути', severity: 'info' },
    { number: 'CDEK-2025-00478307', route: 'Ростов-на-Дону → Краснодар', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478306', route: 'Краснодар → Сочи', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478305', route: 'Сочи → Новороссийск', status: 'ожидает', severity: 'warning' },
    { number: 'CDEK-2025-00478304', route: 'Новороссийск → Геленджик', status: 'в пути', severity: 'info' },
    { number: 'CDEK-2025-00478303', route: 'Геленджик → Анапа', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478302', route: 'Анапа → Керчь', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478301', route: 'Керчь → Симферополь', status: 'отменено', severity: 'danger' },
    { number: 'CDEK-2025-00478300', route: 'Симферополь → Севастополь', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478299', route: 'Севастополь → Ялта', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478298', route: 'Ялта → Алушта', status: 'в пути', severity: 'info' },
    { number: 'CDEK-2025-00478297', route: 'Алушта → Судак', status: 'ожидает', severity: 'warning' },
    { number: 'CDEK-2025-00478296', route: 'Судак → Феодосия', status: 'доставлено', severity: 'success' },
    { number: 'CDEK-2025-00478295', route: 'Феодосия → Керчь', status: 'доставлено', severity: 'success' }
  ];
}

export const LongList: StoryObj = {
  render: () => ({
    template: `<app-dialog-long-list></app-dialog-long-list>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-long-list',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective],
  template: \`
    <extra-button label="Открыть список" (click)="visible = true"></extra-button>

    <extra-dialog header="История отправлений" [(visible)]="visible" size="lg">
      <div class="flex flex-col gap-2">
        @for (row of rows; track row.number) {
          <!-- пункт списка -->
        }
      </div>

      <ng-template extraDialogTemplate="footer">
        <extra-button variant="text" label="Закрыть" (click)="visible = false"></extra-button>
        <extra-button label="Скачать акт" (click)="visible = false"></extra-button>
      </ng-template>
    </extra-dialog>
  \`,
})
export class DialogLongListComponent {
  visible = false;
}
        `
      }
    }
  }
};
