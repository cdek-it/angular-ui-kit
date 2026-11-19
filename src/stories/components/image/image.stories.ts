import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraImageComponent } from '../../../lib/components/image/image.component';
import { ImageFrameComponent, Frame } from './examples/image-frame.component';
import { ImagePreviewComponent, Preview } from './examples/image-preview.component';
import { ImageWidthComponent, Width } from './examples/image-width.component';
import { ImageCropComponent, Crop } from './examples/image-crop.component';

type ImageArgs = Partial<ExtraImageComponent>;

const SRC = 'assets/images/avatar/avatar.png';

const meta: Meta<ImageArgs> = {
  title: 'Components/Media/Image',
  component: ExtraImageComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraImageComponent,
        ImagePreviewComponent,
        ImageWidthComponent,
        ImageCropComponent,
        ImageFrameComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-image' },
    docs: {
      description: {
        component: `Обёртка над PrimeNG \`p-image\`: изображение с необязательным предпросмотром — маска, тулбар, зум и поворот.

Иконки панели предпросмотра заменяются шаблонами \`extraImageTemplate\`.

\`alt\` обязателен по смыслу: без него изображение озвучивается как декоративное.

\`\`\`typescript
import { ExtraImageComponent } from '@cdek-it/angular-ui-kit/components/image';
\`\`\``
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL изображения (обязательный)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст для скринридеров',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    width: {
      control: 'text',
      description: 'Ширина строкой, как HTML-атрибут; без значения — натуральная',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' }
      }
    },
    height: {
      control: 'text',
      description: 'Высота строкой, как HTML-атрибут; без значения — натуральная',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' }
      }
    },
    preview: {
      control: 'boolean',
      description: 'Предпросмотр по клику: маска, тулбар, зум и поворот',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    imageClass: {
      control: 'text',
      description: 'CSS-класс самого img: обрезка, фильтры, размеры',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' }
      }
    },
    styleClass: {
      control: 'text',
      description: 'CSS-класс корневого span: рамка, фон, отступы; для border/padding нужен inline-block',
      table: {
        category: 'Props',
        type: { summary: 'string | undefined' }
      }
    }
  },
  args: {
    src: SRC,
    alt: 'Аватар',
    preview: false
  }
};

export default meta;
type Story = StoryObj<ImageArgs>;

const sourceFromArgs = (args: ImageArgs): string => {
  const attrs = [`src="${args.src ?? ''}"`, `alt="${args.alt ?? ''}"`];

  if (args.width) attrs.push(`width="${args.width}"`);
  if (args.height) attrs.push(`height="${args.height}"`);
  if (args.preview) attrs.push('[preview]="true"');
  if (args.imageClass) attrs.push(`imageClass="${args.imageClass}"`);
  if (args.styleClass) attrs.push(`styleClass="${args.styleClass}"`);

  return `<extra-image ${attrs.join(' ')}></extra-image>`;
};

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: sourceFromArgs(args)
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Базовое изображение: `src` обязателен, `alt` описывает содержимое. Размеры, классы и предпросмотр меняются в Controls.'
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: ImageArgs }) => sourceFromArgs(context.args ?? {})
      }
    }
  }
};

export { Preview, Width, Crop, Frame };
