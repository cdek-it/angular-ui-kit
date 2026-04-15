import { Component, Input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

export type SkeletonShape = 'rectangle' | 'circle';
export type SkeletonAnimation = 'wave' | 'none';

@Component({
  selector: 'skeleton',
  host: { style: 'display: block' },
  standalone: true,
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
  `,
})
export class SkeletonComponent {
  @Input() shape: SkeletonShape = 'rectangle';
  @Input() animation: SkeletonAnimation = 'wave';
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() size: string | undefined = undefined;
  @Input() borderRadius: string | undefined = undefined;
}
