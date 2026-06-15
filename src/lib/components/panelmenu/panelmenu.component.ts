import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input } from '@angular/core';
import { PanelMenu } from 'primeng/panelmenu';
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';

@Component({
  selector: 'extra-panelmenu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelMenu],
  template: ` <p-panelmenu [model]="model" [multiple]="multiple" [tabindex]="tabindex"></p-panelmenu> `
})
export class ExtraPanelMenuComponent implements AfterViewChecked {
  @Input() model: ExtraMenuItem[] = [];
  @Input() multiple = false;
  @Input() tabindex: number | undefined = undefined;

  private activeItemId: string | null = null;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onItemClick(event: MouseEvent): void {
    const target = event.target as Element;

    if (target.closest('.p-panelmenu-header')) return;

    const item = target.closest('.p-panelmenu-item');
    if (!item) return;

    this.activeItemId = item.id || null;
    this.applyActiveClass();
  }

  ngAfterViewChecked(): void {
    if (this.activeItemId) {
      this.applyActiveClass();
    }
  }

  private applyActiveClass(): void {
    const root = this.el.nativeElement;
    root
      .querySelectorAll<HTMLElement>('.p-panelmenu-item-active')
      .forEach((el) => el.classList.remove('p-panelmenu-item-active'));

    if (this.activeItemId) {
      const active = root.querySelector<HTMLElement>(`#${CSS.escape(this.activeItemId)}`);
      if (active) {
        active.classList.add('p-panelmenu-item-active');
      }
    }
  }
}
