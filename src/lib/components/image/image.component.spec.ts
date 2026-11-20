import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

import { ExtraImageComponent } from './image.component';

@Component({
  standalone: true,
  imports: [ExtraImageComponent],
  template: `
    @if (show) {
      <extra-image src="assets/images/avatar/avatar.png" alt="Аватар" [preview]="true"></extra-image>
    }
  `
})
class HostComponent {
  show = true;
}

describe('ExtraImageComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideNoopAnimations(), providePrimeNG({})]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('p-overflow-hidden');
    document.body.style.removeProperty('--scrollbar-width');
  });

  it('снимает блокировку прокрутки при уничтожении с открытым предпросмотром', () => {
    const previewButton: HTMLElement | null = fixture.nativeElement.querySelector('.p-image-preview-mask');
    expect(previewButton).withContext('кнопка предпросмотра').toBeTruthy();

    previewButton!.click();
    fixture.detectChanges();
    expect(document.body.classList.contains('p-overflow-hidden')).withContext('прокрутка заблокирована').toBeTrue();

    fixture.componentInstance.show = false;
    fixture.detectChanges();

    expect(document.body.classList.contains('p-overflow-hidden')).withContext('прокрутка разблокирована').toBeFalse();
  });
});
