import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraGalleriaComponent } from '../../../lib/components/galleria/galleria.component';
import { GalleriaDefaultComponent } from './examples/galleria-default.component';
import { GalleriaThumbnailsComponent } from './examples/galleria-thumbnails.component';
import { GalleriaCaptionComponent } from './examples/galleria-caption.component';
import { GalleriaFullscreenComponent } from './examples/galleria-fullscreen.component';
import { GalleriaAutoplayComponent } from './examples/galleria-autoplay.component';

const meta: Meta<ExtraGalleriaComponent> = {
  title: 'Components/Media/Galleria',
  component: ExtraGalleriaComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Компонент для отображения галереи изображений с поддержкой миниатюр, индикаторов, автовоспроизведения и полноэкранного режима.

\`\`\`typescript
import { ExtraGalleriaComponent, ExtraGalleriaItemDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-galleria' }
  },
  argTypes: {
    value: {
      control: false,
      description: 'Массив изображений для галереи',
      table: {
        category: 'Props',
        type: { summary: 'GalleriaItem[]' }
      }
    },
    numVisible: {
      control: 'number',
      description: 'Количество видимых миниатюр',
      table: {
        category: 'Props',
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    showItemNavigators: {
      control: 'boolean',
      description: 'Показывать кнопки навигации между изображениями',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Показывать миниатюры',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showIndicators: {
      control: 'boolean',
      description: 'Показывать индикаторы текущего изображения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    circular: {
      control: 'boolean',
      description: 'Циклический переход между изображениями',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autoPlay: {
      control: 'boolean',
      description: 'Автоматическое воспроизведение слайдшоу',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    transitionInterval: {
      control: 'number',
      description: 'Интервал смены изображений в мс (при autoPlay)',
      table: {
        category: 'Props',
        defaultValue: { summary: '4000' },
        type: { summary: 'number' }
      }
    },
    fullScreen: {
      control: 'boolean',
      description: 'Полноэкранный режим',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    visible: {
      control: 'boolean',
      description: 'Видимость галереи в полноэкранном режиме',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    activeIndexChange: {
      control: false,
      description: 'Событие смены активного изображения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<number>' }
      }
    },
    visibleChange: {
      control: false,
      description: 'Событие изменения видимости (полноэкранный режим)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<boolean>' }
      }
    },
    containerClass: { table: { disable: true } },
    containerStyle: { table: { disable: true } },
    responsiveOptions: { table: { disable: true } },
    showIndicatorsOnItem: { table: { disable: true } },
    showItemNavigatorsOnHover: { table: { disable: true } },
    showThumbnailNavigators: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<ExtraGalleriaComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  decorators: [moduleMetadata({ imports: [GalleriaDefaultComponent] })],
  render: () => ({ template: `<app-galleria-default></app-galleria-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример галереи с навигацией и индикаторами, без миниатюр.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraGalleriaComponent, ExtraGalleriaItemDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-galleria-default',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective],
  template: \`
    <extra-galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showIndicators]="true"
      [showThumbnails]="false"
      [circular]="true"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </extra-galleria>
  \`,
})
export class AppGalleriaDefaultComponent {
  images = [ /* массив GalleriaItem */ ];
}
        `
      }
    }
  }
};

// ── Thumbnails ────────────────────────────────────────────────────────────────

export const Thumbnails: Story = {
  name: 'Thumbnails',
  decorators: [moduleMetadata({ imports: [GalleriaThumbnailsComponent] })],
  render: () => ({ template: `<app-galleria-thumbnails></app-galleria-thumbnails>` }),
  parameters: {
    docs: {
      description: {
        story: 'Галерея с панелью миниатюр для навигации.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  ExtraGalleriaThumbnailDirective
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-galleria-thumbnails',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaThumbnailDirective],
  template: \`
    <extra-galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [circular]="true"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template extraGalleriaThumbnail let-item>
        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block;" />
      </ng-template>
    </extra-galleria>
  \`,
})
export class AppGalleriaThumbnailsComponent {
  images = [ /* массив GalleriaItem */ ];
}
        `
      }
    }
  }
};

// ── Caption ───────────────────────────────────────────────────────────────────

export const Caption: Story = {
  name: 'Caption',
  decorators: [moduleMetadata({ imports: [GalleriaCaptionComponent] })],
  render: () => ({ template: `<app-galleria-caption></app-galleria-caption>` }),
  parameters: {
    docs: {
      description: {
        story: 'Галерея с подписью к каждому изображению.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  ExtraGalleriaCaptionDirective
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-galleria-caption',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaCaptionDirective],
  template: \`
    <extra-galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showThumbnails]="false"
      [showIndicators]="true"
      [circular]="true"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template extraGalleriaCaption let-item>
        <div style="padding: 12px 16px;">
          <h4 style="margin: 0 0 4px;">{{ item.title }}</h4>
          <p style="margin: 0; opacity: 0.8; font-size: 0.875rem;">{{ item.description }}</p>
        </div>
      </ng-template>
    </extra-galleria>
  \`,
})
export class AppGalleriaCaptionComponent {
  images = [ /* массив GalleriaItem */ ];
}
        `
      }
    }
  }
};

// ── FullScreen ────────────────────────────────────────────────────────────────

export const FullScreen: Story = {
  name: 'FullScreen',
  decorators: [moduleMetadata({ imports: [GalleriaFullscreenComponent] })],
  render: () => ({ template: `<app-galleria-fullscreen></app-galleria-fullscreen>` }),
  parameters: {
    docs: {
      description: {
        story: 'Галерея в полноэкранном режиме — открывается по кнопке.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  ExtraGalleriaThumbnailDirective
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-galleria-fullscreen',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaThumbnailDirective],
  template: \`
    <button label="Открыть галерею" (click)="visible = true"></button>

    <extra-galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [circular]="true"
      [fullScreen]="true"
      [visible]="visible"
      (visibleChange)="visible = $event"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template extraGalleriaThumbnail let-item>
        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block;" />
      </ng-template>
    </extra-galleria>
  \`,
})
export class AppGalleriaFullscreenComponent {
  images = [ /* массив GalleriaItem */ ];
  visible = false;
}
        `
      }
    }
  }
};

// ── Autoplay ──────────────────────────────────────────────────────────────────

export const Autoplay: Story = {
  name: 'Autoplay',
  decorators: [moduleMetadata({ imports: [GalleriaAutoplayComponent] })],
  render: () => ({ template: `<app-galleria-autoplay></app-galleria-autoplay>` }),
  parameters: {
    docs: {
      description: {
        story: 'Галерея с автоматической сменой изображений каждые 3 секунды.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraGalleriaComponent, ExtraGalleriaItemDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-galleria-autoplay',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective],
  template: \`
    <extra-galleria
      [value]="images"
      [showItemNavigators]="true"
      [showIndicators]="true"
      [showThumbnails]="false"
      [circular]="true"
      [autoPlay]="true"
      [transitionInterval]="3000"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </extra-galleria>
  \`,
})
export class AppGalleriaAutoplayComponent {
  images = [ /* массив GalleriaItem */ ];
}
        `
      }
    }
  }
};
