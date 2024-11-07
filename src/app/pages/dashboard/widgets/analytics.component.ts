import { Component, ElementRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>

    <button mat-raised-button class="mt-16">Go to details</button>
  `,
  styles: `
  .chart-container{
    height: calc(100% - 100px);
    width: 100%;
  }
  .mt-16{
    position: absolute;
    bottom: 15px;
  }
  `
})
export class AnalyticsComponent {
  chart = viewChild.required<ElementRef>('chart');
  
  ngOnInit(){

  }
}
