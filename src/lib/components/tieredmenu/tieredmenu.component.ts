import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input } from '@angular/core';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'tieredmenu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TieredMenu],
  template: `
    <p-tieredmenu
      [model]="model"
      [autoDisplay]="autoDisplay"
      [tabindex]="tabindex"
    ></p-tieredmenu>
  `,
})
export class TieredMenuComponent implements AfterViewChecked {
  @Input() model: MenuItem[] = [];
  @Input() autoDisplay = true;
  @Input() tabindex: number | undefined = undefined;

  private activeItemId: string | null = null;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onItemClick(event: MouseEvent): void {
    const target = event.target as Element;
    const item = target.closest('.p-tieredmenu-item');
    if (!item) return;

    const hasSubmenu = item.querySelector(':scope > .p-tieredmenu-submenu, :scope > [class*="content-container"]');
    if (hasSubmenu) return;

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
    root.querySelectorAll<HTMLElement>('.p-tieredmenu-item-checked')
      .forEach(el => el.classList.remove('p-tieredmenu-item-checked'));

    if (this.activeItemId) {
      const active = root.querySelector<HTMLElement>(`#${CSS.escape(this.activeItemId)}`);
      if (active) {
        active.classList.add('p-tieredmenu-item-checked');
      }
    }
  }
}
