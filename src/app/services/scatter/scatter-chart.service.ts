import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { TwoDimData } from '../../models/TwoDimData';

@Injectable({
  providedIn: 'root'
})
export class ScatterChartService {

  @ViewChild('containerPieChart', { static: false }) element!: ElementRef;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;

  createChart(
    element: ElementRef,
    data: TwoDimData[],
    onBarClick: (data: TwoDimData) => void  
  ){}
}
