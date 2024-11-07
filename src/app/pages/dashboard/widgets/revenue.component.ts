import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div>
      <span>25,020 </span>
      <mat-icon>check_circle</mat-icon>
    </div>
    <br>
    <div>
      <span class="text-green"> +502</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class RevenueComponent {

}
