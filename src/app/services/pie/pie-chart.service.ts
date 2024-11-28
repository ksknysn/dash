import { ElementRef, HostListener, Injectable, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TwoDimData } from '../../models/TwoDimData';

@Injectable({
  providedIn: 'root' // Make the service injectable anywhere in the application
})
export class PieChartService {
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
      console.error('Container not found for pie chart.');
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight - container.clientHeight * 0.1; const radius = Math.min(width, height) / 2;

    this.svg = this.host.append('svg')
      .attr('preserveAspectRatio', 'xMidYMax meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(' + width/2 +  ',' + height/2 +')');


    const pie = d3.pie<TwoDimData>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = this.svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(String(i)))
      .on('click', (event, d) => alert(`Dilime tıklandı: ${d.data.label}, Değer: ${d.data.value}`));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.label);
  }
}