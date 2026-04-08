import { Component } from '@angular/core';
import { SkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex flex-col gap-3">
    <skeleton height="1rem"></skeleton>
    <skeleton height="1rem" width="75%"></skeleton>
    <skeleton height="1rem" width="50%"></skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-rectangles',
  standalone: true,
  imports: [SkeletonComponent],
  template,
  styles,
})
export class SkeletonRectanglesComponent {}
