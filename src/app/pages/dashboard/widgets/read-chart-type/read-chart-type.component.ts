import { AfterViewInit, Component, effect, ElementRef, HostListener, Injector, input, model, signal, ViewChild } from '@angular/core';
import { ChartTypesComponent } from "./chart-types/chart-types.component";
import { TwoDimData } from '../../../../models/TwoDimData';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-read-chart-type',
  standalone: true,
  imports: [ChartTypesComponent],
  template: `
    <div class="chart-container">
      <div #containerPieChart></div>
    </div>
    
    <app-chart-types class="tips" [(chartTip)]="chartType"></app-chart-types>
  `,
  styles: `
    .chart-container {
      position:relative;
      width: 100%;
      height: calc(100% - 20px);
    }
    #containerPieChart {
      position: absolute;
    }
    .tips{
      position: absolute;
      bottom: 0px;
    }
  `
})
export class ReadChartTypeComponent implements AfterViewInit {

  chartType = signal('bar_chart');

  constructor(private piechartService: PieChartService, private barchartService: BarChartService) {

    effect(() => {
      this.drawChart();
    });
  }
  
  @ViewChild('containerPieChart', { static: true }) element!: ElementRef;
  
  data: TwoDimData[] = [
    { label: 'IT', value: 30 },
    { label: 'HR', value: 50 },
    { label: 'Sales', value: 40 },
    { label: 'Production', value: 70 },
    { label: 'Purchasing', value: 50 },
    { label: 'Tech', value: 50 },
  ];

  clickFunc(){
  
  }

  ngAfterViewInit(): void {
    this.chartType.set('bar_chart');
    setTimeout(() => {
      this.drawChart();
    }, 350);
  }

  drawChart(){
    
    if (!this.element.nativeElement) {
      console.error('Element not found!');
      return;
    }
    if(this.chartType() == "bar_chart"){
      this.barchartService.createChart(this.element, this.data, this.clickFunc);
    }
    else if(this.chartType() == "pie_chart"){
      this.piechartService.createChart  (this.element, this.data, this.clickFunc);
    }

  }

  @HostListener('window:resize')
  onResize() {
    this.drawChart();
  }
}
