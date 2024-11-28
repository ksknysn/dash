import { ElementRef, Injectable, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TwoDimData } from '../../models/TwoDimData';

@Injectable({
  providedIn: 'root',
})
export class BarChartService {
  @ViewChild('containerPieChart', { static: false }) element!: ElementRef;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;

  createChart(
    element: ElementRef,
    data: TwoDimData[], 
    onBarClick: (data: TwoDimData) => void  
  ): void {
    this.host = d3.select(element.nativeElement);
    this.host.html('');

    const container = this.host.node()?.parentElement;
    if (!container) {
      console.error('Container element not found.');
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight ;
    
    this.svg = this.host.append('svg')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `-20 20 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(0,0)');

    
    const x = d3.scaleBand().range([0, width]).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = this.svg.append('g').attr('transform', `translate(0,${height})`);
    const yAxis = this.svg.append('g').attr('class', 'y');

    // Ekseni güncelleme
    x.domain(data.map(d => d.label));
    xAxis.transition().duration(100).call(d3.axisBottom(x));

    const maxY = d3.max(data, d => d.value) || 0;
    y.domain([0, maxY + maxY * 0.2]);
    yAxis.transition().duration(100).call(d3.axisLeft(y));

    // Barlar
    const u = this.svg.selectAll('rect').data(data);

    u.enter()
      .append('rect')
      .on('click', (event, d) => onBarClick(d as TwoDimData)) // Click olayını işleme
      .transition()
      .duration(100)
      .attr('x', d => x(d.label) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'var(--sys-inverse-surface)');
  }
}
