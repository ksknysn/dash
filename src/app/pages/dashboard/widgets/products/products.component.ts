import { AfterViewInit, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import {MatButtonModule} from '@angular/material/button';
import { TwoDimData } from '../../../../models/TwoDimData';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { MenuComponent } from './menu/menu/menu.component';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import { ChartTypesComponent2 } from './menu/chart-types/chart-types.component';
import { PieCleanChartService } from '../../../../services/pie-clean/pie-clean-chart.service';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MenuComponent, ChartTypesComponent2],
  template: `
  <!-- Add 2 buttons -->
    <app-menu class="menu" [(sex)]="gender"></app-menu>
    
    <div class="chart-container">
      <div #containerBarChart></div>
    </div>
    
    <app-chart-types2 class="tips" [(chartTipGender)]="chartType"></app-chart-types2>

  `,
  styles: `
  .menu{
    position:static;
    display:block;
  }
  .chart-container {
      position:static;
      width: 100%;
      height: calc(100% - 60px);
    }
    #containerBarChart{
      position: static;
    }
    .tips{
      position: static;
      display: block;
    }
    
    `
})
export class ProductsComponent implements AfterViewInit {
  
  
  chartType = signal<string>(
    localStorage.getItem('productscomponentChartType') || 'bar_chart'
  );
  
  gender = signal<string>(
    localStorage.getItem('personscomponentGender') || 'var1'
  );

  constructor(
    private cleanpiechartService: PieCleanChartService,
    private piechartService: PieChartService, 
    private barChartService: BarChartService) {

    effect(() => {
      //this.drawChart(this.chartType().toString());
      this.chartType(),
      this.gender(),
      this.drawChart();

      //Store to local
      localStorage.setItem('productscomponentChartType', this.chartType() || 'bar_chart');
      localStorage.setItem('productscomponentGender', this.gender() || 'var1');


    });
  }

  @ViewChild('containerBarChart', { static: true }) element!: ElementRef;
  private chartData: TwoDimData[] = []; 
  
  

  async drawChart(){
        // Load the CSV data and assign it to chartData
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv")
        .then((data) => {
          // Map the data to match the BarData interface
          this.chartData = data.map(d => ({
            label: d['group'],
            value: +d[this.gender().toString()] // Convert the value to a number
          }));

          setTimeout(() => {            
            if(this.chartType() == 'bar_chart')
              this.barChartService.createChart(this.element, this.chartData, this.handleBarClick);
            else if(this.chartType() == 'pie_chart')
              this.piechartService.createChart(this.element, this.chartData, this.handleBarClick);
            else if(this.chartType() == "donut_chart"){
              this.cleanpiechartService.createChart  (this.element, this.chartData, this.handleBarClick);
            }
          }, 100);
            
        })
        .catch((error) => {
          console.error("Error loading CSV data:", error);
        });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.drawChart();
    }, 300);
  }


  private handleBarClick(data: TwoDimData): void {
    alert(`Group: ${data.label}, Value: ${data.value}`);
  }
  


}
