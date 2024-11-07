import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="row mb-8 mt-8">
      <p class="stat">25,020</p>
      <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="task_alt"></mat-icon>

    </div>
    <div class="text-dim-gray stat-subtext">
      <span class="text-green"> +502</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class RevenueComponent {

}
