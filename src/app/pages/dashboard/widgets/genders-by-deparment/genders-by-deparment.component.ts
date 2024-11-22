import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { BarData } from '../../../../services/bar/bar-data';
import * as d3 from 'd3';
import { MatButtonModule } from '@angular/material/button';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-stroked-button (click)="loadData('var1')">Male</button>
    <button mat-stroked-button (click)="loadData('var2')">Female</button>
    <div class="chart-container">
      <div #containerBarChart></div>
    </div>
    <span class="material-symbols-outlined mb-8" (click)="changeChart('bar')">
    <mat-icon>bar_chart</mat-icon>
    </span>
  `,
  styles: [
    `
      .chart-container {
        width: 80%;
        height: 80%;
      }
      #containerBarChart {
        position: absolute;
      }
    `,
  ],
})
export class GendersByDeparmentComponent implements AfterViewInit {
  @ViewChild('containerBarChart', { static: true }) element!: ElementRef;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;
  //private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;

  changeChart(chartType: string){
    alert(chartType);
  }
  constructor(
    private barChartService: BarChartService,
    private pieChartService: PieChartService
  ) {}

  async ngOnInit() {
    //await this.loadData('var1');
  }

  async loadData(selectedVar: string) {
    this.clearPie();
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv'
    )
      .then(data => {
        const chartData = data.map(d => ({
          label: d['group'],
          value: +d[selectedVar],
        }));

        // this.barChartService.createChart(
        //   d3.select(this.element.nativeElement),
        //   chartData,
        //   this.handleBarClick
        // );

        this.pieChartService.createPieChart(
          this.host,
          d3.select(this.element.nativeElement),
          chartData
        );


      })
      .catch(error => {
        console.error('Error loading CSV data:', error);
      });
  }

  private handleBarClick(data: BarData): void {
    alert(`Group: ${data.label}, Value: ${data.value}`);
  }

  ngAfterViewInit() {
    // İlk veri yüklemesi
    this.loadData('var1');
  }

  clearPie(){
    if (!this.element.nativeElement) {
      console.error('Element not found!');
      return;
    }
    this.host = d3.select(this.element.nativeElement);
    this.host.html('');
  }
}
