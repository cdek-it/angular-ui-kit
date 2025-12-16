import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">
      <p-button label="Primary"/>
      <p-button label="Danger" severity="danger" />
      <p-button label="Warning" severity="warn" />
      <p-button label="Success" severity="success" />
      <p-button label="Info" severity="info" />
      <p-button label="Help" severity="help" />
    </div>

      <div class="flex gap-3 items-end">
      <p-button label="Primary" [rounded]="true"/>
      <p-button label="Danger" [rounded]="true" severity="danger" />
      <p-button label="Warning" [rounded]="true" severity="warn" />
      <p-button label="Success" [rounded]="true" severity="success" />
      <p-button label="Info" [rounded]="true" severity="info" />
      <p-button label="Help" [rounded]="true" severity="help" />
    </div>

    <div class="flex gap-3 items-end">
      <p-button label="Primary" [text]="true"/>
      <p-button label="Danger" [text]="true" severity="danger" />
      <p-button label="Warning" [text]="true" severity="warn" />
      <p-button label="Success" [text]="true" severity="success" />
      <p-button label="Info" [text]="true" severity="info" />
      <p-button label="Help" [text]="true" severity="help" />
    </div>

    <div class="flex gap-3 items-end">
      <p-button icon="ti ti-check" />
      <p-button icon="ti ti-file-alert" severity="danger" />
      <p-button icon="ti ti-bell" severity="warn" />
      <p-button icon="ti ti-search" severity="success" />
      <p-button icon="ti ti-user" severity="info" />
      <p-button icon="ti ti-heart" severity="help" />
    </div>

     <div class="flex gap-3 items-end">
      <p-button icon="ti ti-check" [outlined]="true" />
      <p-button icon="ti ti-file-alert" [outlined]="true" severity="danger" />
      <p-button icon="ti ti-bell" [outlined]="true" severity="warn" />
      <p-button icon="ti ti-search" [outlined]="true" severity="success" />
      <p-button icon="ti ti-user" [outlined]="true" severity="info" />
      <p-button icon="ti ti-heart" [outlined]="true" severity="help" />
    </div>

    <div class="flex gap-3 items-end">
      <p-button icon="ti ti-check" [rounded]="true" />
      <p-button icon="ti ti-file-alert" [rounded]="true" severity="danger" />
      <p-button icon="ti ti-bell" [rounded]="true" severity="warn" />
      <p-button icon="ti ti-search" [rounded]="true" severity="success" />
      <p-button icon="ti ti-user" [rounded]="true" severity="info" />
      <p-button icon="ti ti-heart" [rounded]="true" severity="help" />
    </div>

    <div class="flex gap-3 items-end">
      <p-button icon="ti ti-check" [rounded]="true" [outlined]="true" />
      <p-button icon="ti ti-file-alert" [rounded]="true" [outlined]="true" severity="danger" />
      <p-button icon="ti ti-bell" [rounded]="true" [outlined]="true" severity="warn" />
      <p-button icon="ti ti-search" [rounded]="true" [outlined]="true" severity="success" />
      <p-button icon="ti ti-user" [rounded]="true" [outlined]="true" severity="info" />
      <p-button icon="ti ti-heart" [rounded]="true" [outlined]="true" severity="help" />
    </div>

      <div class="flex gap-3 items-end">
      <p-button icon="ti ti-check" [rounded]="true" [text]="true" />
      <p-button icon="ti ti-file-alert" [rounded]="true" [text]="true" severity="danger" />
      <p-button icon="ti ti-bell" [rounded]="true" [text]="true" severity="warn" />
      <p-button icon="ti ti-search" [rounded]="true" [text]="true" severity="success" />
      <p-button icon="ti ti-user" [rounded]="true" [text]="true" severity="info" />
      <p-button icon="ti ti-heart" [rounded]="true" [text]="true" severity="help" />
    </div>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-severity',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonSeverityComponent {}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-button-severity></app-button-severity>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки с разным Severity'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-severity',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonSeverityComponent {}
        `
      }
    }
  }
};
