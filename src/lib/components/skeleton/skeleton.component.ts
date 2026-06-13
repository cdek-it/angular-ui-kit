import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

export type ExtraSkeletonShape = 'rectangle' | 'circle';
export type ExtraSkeletonAnimation = 'wave' | 'none';

@Component({
  selector: 'extra-skeleton',
  host: { style: 'display: block' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton],
  template: `
    <p-skeleton
      [shape]="shape"
      [animation]="animation"
      [width]="width"
      [height]="height"
      [size]="size"
      [borderRadius]="borderRadius"
    ></p-skeleton>
  `
})
export class ExtraSkeletonComponent {
  @Input() shape: ExtraSkeletonShape = 'rectangle';
  @Input() animation: ExtraSkeletonAnimation = 'wave';
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() size: string | undefined = undefined;
  @Input() borderRadius: string | undefined = undefined;
}
