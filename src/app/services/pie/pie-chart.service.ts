import { Injectable } from '@angular/core';
import { PieData } from './pie-data'; // Import the PieData interface
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root' // Make the service injectable anywhere in the application
})
export class PieChartService {


  constructor() {}

  /**
   * Creates a pie chart using D3.js based on the provided data and container element.
   * @param data The pie chart data in the format of PieData[]
   * @param container The DOM element where the chart will be rendered
   */
  createPieChart(
    host: d3.Selection<HTMLElement, unknown, null, undefined>,
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: PieData[]
  ): void {
    // D3.js pie chart creation logic (refer to the code from PieComponent)
    const container = host.node()?.parentElement;

    if (!container) {
      console.error('Container not found for pie chart.');
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight;
    const radius = Math.min(width, height) / 2;
    console.log("service:",width, height);

    svg = host.append('svg')

      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<PieData>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<any>>().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = svg.selectAll('.arc')
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