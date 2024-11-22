import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { PieData } from '../../../../services/pie/pie-data';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-personel-test',
  standalone: true,
  imports: [],
  template: `
    <div class="chart-container">
      <div #containerPieChart></div>
    </div>
  `,
  styles: `
  .chart-container {
      width: 100%;
      height: 100%;
    }
    #containerPieChart {
      position: absolute;
    }
    `
})
export class PersonelTestComponent implements AfterViewInit {
  @ViewChild('containerPieChart', { static: true }) element!: ElementRef;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;

  data: PieData[] = [
    { label: 'IT', value: 30 },
    { label: 'HR', value: 50 },
    { label: 'Sales', value: 40 },
    { label: 'Production', value: 70 },
    { label: 'Purchasing', value: 50 },
  ];

  /**
   *
   */
  constructor(private piechartService: PieChartService) {
    
  }

  ngAfterViewInit(): void {
    if (!this.element.nativeElement) {
      console.error('Element not found!');
      return;
    }
    this.host = d3.select(this.element.nativeElement);
    this.host.html('');
    
    console.log('Host and SVG initialized:', this.host, this.svg);
    this.piechartService.createPieChart(this.host, this.svg, this.data);
  }

}
