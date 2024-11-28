import { AfterViewInit, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import {MatButtonModule} from '@angular/material/button';
import { TwoDimData } from '../../../../models/TwoDimData';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { MenuComponent } from './menu/menu/menu.component';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import { ChartTypesComponent2 } from './menu/chart-types/chart-types.component';

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
    
    <app-chart-types2 class="tips" [(chartTipGender)]="chartTypeGender"></app-chart-types2>

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
  
  chartTypeGender = signal('bar_chart');
  gender = signal('var1');

  constructor(private piechartService: PieChartService, private barChartService: BarChartService) {

    effect(() => {
      //this.drawChart(this.chartType().toString());
      this.chartTypeGender(),
      this.drawChart(this.gender().toString());
    });
  }

  @ViewChild('containerBarChart', { static: true }) element!: ElementRef;
  private chartData: TwoDimData[] = []; 
  
  

  async drawChart(selectedVar: string){
        // Load the CSV data and assign it to chartData
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv")
        .then((data) => {
          // Map the data to match the BarData interface
          this.chartData = data.map(d => ({
            label: d['group'],
            value: +d[selectedVar] // Convert the value to a number
          }));

          setTimeout(() => {            
            if(this.chartTypeGender() == 'bar_chart')
              this.barChartService.createChart(this.element, this.chartData, this.handleBarClick);
            else if(this.chartTypeGender() == 'pie_chart')
              this.piechartService.createChart(this.element, this.chartData, this.handleBarClick);
          }, 100);
            
        })
        .catch((error) => {
          console.error("Error loading CSV data:", error);
        });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.drawChart('var1');
    }, 300);
  }


  private handleBarClick(data: TwoDimData): void {
    alert(`Group: ${data.label}, Value: ${data.value}`);
  }
  


}
