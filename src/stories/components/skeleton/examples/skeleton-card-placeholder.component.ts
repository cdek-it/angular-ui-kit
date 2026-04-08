import { Component } from '@angular/core';
import { SkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex gap-4">
    <skeleton shape="circle" size="4rem"></skeleton>
    <div class="flex flex-col gap-2 flex-1">
      <skeleton height="1rem" width="60%"></skeleton>
      <skeleton height="0.75rem" width="40%"></skeleton>
      <skeleton height="0.75rem"></skeleton>
    </div>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-card-placeholder',
  standalone: true,
  imports: [SkeletonComponent],
  template,
  styles,
})
export class SkeletonCardPlaceholderComponent {}
