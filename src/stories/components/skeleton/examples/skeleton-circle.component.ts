import { Component } from '@angular/core';
import { SkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex items-center gap-4">
    <skeleton shape="circle" size="3rem"></skeleton>
    <skeleton shape="circle" size="4rem"></skeleton>
    <skeleton shape="circle" size="6rem"></skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-circle',
  standalone: true,
  imports: [SkeletonComponent],
  template,
  styles,
})
export class SkeletonCircleComponent {}
