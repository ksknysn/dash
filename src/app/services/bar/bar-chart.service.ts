import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BarData } from './bar-data';

@Injectable({
  providedIn: 'root',
})
export class BarChartService {
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;

  createChart(
    host: d3.Selection<HTMLElement, unknown, null, undefined>,
    data: BarData[],
    onBarClick: (data: BarData) => void
  ): void {
    // Temizlik
    host.html('');

    // Dinamik genişlik ve yükseklik belirleme
    const container = host.node()?.parentElement;
    if (!container) {
      console.error('Container element not found.');
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight - container.clientHeight * 0.2;

    // SVG ve grup elementi oluşturma
    this.svg = host.append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(0,0)');

    // X ve Y eksenleri
    const x = d3.scaleBand().range([0, width]).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = this.svg.append('g').attr('transform', `translate(0,${height})`);
    const yAxis = this.svg.append('g').attr('class', 'y');

    // Ekseni güncelleme
    x.domain(data.map(d => d.label));
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    const maxY = d3.max(data, d => d.value) || 0;
    y.domain([0, maxY + maxY * 0.2]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Barlar
    const u = this.svg.selectAll('rect').data(data);

    u.join('rect')
      .on('click', (event, d) => onBarClick(d as BarData)) // Click olayını işleme
      .transition()
      .duration(100)
      .attr('x', d => x(d.label) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#69b3a2');
  }
}
