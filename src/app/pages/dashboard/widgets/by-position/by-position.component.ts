import { Component, effect, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { ChartTypesComponent } from './chart-type/chart-type.component';
import { TwoDimData } from '../../../../models/TwoDimData';
import { PieCleanChartService } from '../../../../services/pie-clean/pie-clean-chart.service';
import { PieChartService } from '../../../../services/pie/pie-chart.service';
import { BarChartService } from '../../../../services/bar/bar-chart.service';
import { HttpClientService } from '../../../../services/http-client.service';

@Component({
  selector: 'app-by-position',
  standalone: true,
  imports: [ChartTypesComponent],
  template: `
    <div class="chart-container">
      <div #chartContainer></div>
    </div>

    <app-chart-types class="tips" [(chartTip)]="chartType"></app-chart-types>
  `,
  styles: `
  .chart-container {
    position:relative;
    width: 100%;
    height: calc(100% - 20px);
  }
  #chartContainer {
    position: absolute;
  }
  .tips{
    position: absolute;
    bottom: 0px;
  }`
})
export class ByPositionComponent {
  chartType = signal<string>(
    localStorage.getItem('bypositioncomponent') || 'bar_chart'
  );

  constructor(
    private cleanpiechartService: PieCleanChartService,
    private piechartService: PieChartService,
    private barchartService: BarChartService,
    private httpClientService: HttpClientService
  ) {

    effect(() => {
      this.drawChart();
      localStorage.setItem('bypositioncomponent', this.chartType() || 'bar_chart');  
    });
  }

  data: TwoDimData[] = []; // Grafik verileri burada tutulacak
  ngOnInit(): void {
    this.httpClientService
      .get<ByPositionResponse>({ controller: 'totalResourcesByPosition' })
      .subscribe((response) => {
        // Gelen veriyi grafik için uygun formata çeviriyoruz
        this.data = Object.entries(response.total_resources_by_position).map(
          ([key, value]) => ({
            label: key,
            value: value
          })
        );
        
      });
  }

  ngAfterViewInit(): void {
    
    setTimeout(() => {
      
      this.drawChart();
    }, 1000);// Grafik çizimi
  }

  @ViewChild('chartContainer', { static: true }) element!: ElementRef;

  drawChart(){
    if (!this.element.nativeElement) {
      console.error('Element not found!');
      return;
    }
    if(this.chartType() == "bar_chart"){
      this.barchartService.createChart(this.element, this.data, this.clickFunc);
    }
    else if(this.chartType() == "pie_chart"){
      this.piechartService.createChart (this.element, this.data, this.clickFunc);
    }
    else if(this.chartType() == "donut_chart"){
      this.cleanpiechartService.createChart (this.element, this.data, this.clickFunc);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.drawChart(); // Sayfa boyutlandığında grafik yeniden çizilsin
  }

  private clickFunc(data: TwoDimData): void {
    alert(`Group: ${data.label}, Value: ${data.value}`);
  }
}


interface ByPositionResponse {
  total_resources_by_position: {
    [key: string]: number; // Örn. "Eligible NonCitizen", "US Citizen" gibi dinamik anahtarlar
  };
}
