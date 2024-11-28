import { Component, inject } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-watch-time',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="mb-8">
        <span>25,020 </span>
        <mat-icon>check_circle</mat-icon>
    </div>
    <div>
      <span class="text-green"> +502</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class WatchTimeComponent {
  constructor(){
    const iconRegistry = inject(MatIconRegistry);
  }

}
