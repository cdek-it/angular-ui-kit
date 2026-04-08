import { Component } from '@angular/core';
import { SkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex flex-col gap-3">
    <skeleton animation="none" height="1rem"></skeleton>
    <skeleton animation="none" height="1rem" width="75%"></skeleton>
    <skeleton animation="none" shape="circle" size="4rem"></skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-no-animation',
  standalone: true,
  imports: [SkeletonComponent],
  template,
  styles,
})
export class SkeletonNoAnimationComponent {}
