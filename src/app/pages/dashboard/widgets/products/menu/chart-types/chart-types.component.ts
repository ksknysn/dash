import { Component, effect, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-types2',
  standalone: true,
  imports: [MatIconModule],
  template: `
      <span class="material-symbols-outlined" class="footer-icon" (click)="chartTipGender.set('bar_chart')">
        <mat-icon>bar_chart</mat-icon>
      </span>
      <span class="material-symbols-outlined" class="footer-icon" (click)="chartTipGender.set('pie_chart')">
        <mat-icon>pie_chart</mat-icon>
      </span>
      <span class="material-symbols-outlined" class="footer-icon" (click)="chartTipGender.set('donut_chart')">
        <mat-icon>donut_large</mat-icon>
      </span>
  `,
  styles: `
  `
})
export class ChartTypesComponent2 {
  chartTipGender = model<string>();
}
