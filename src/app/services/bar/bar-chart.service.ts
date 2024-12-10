import { ElementRef, Injectable, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TwoDimData } from '../../models/TwoDimData';
import { TextMeasurementService } from '../text-measurement/text-measurement.service';

@Injectable({
  providedIn: 'root',
})
export class BarChartService {
  /**
   *
   */
  constructor(private textMeasurementService: TextMeasurementService) {
  }
  @ViewChild('containerPieChart', { static: false }) element!: ElementRef;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;

  createChart(
    element: ElementRef,
    data: TwoDimData[], 
    onBarClick: (data: TwoDimData) => void  
  ): void {

    // Find the longest label in the dataset
     const longestLabel = d3.max(data, (d) => d.label.length) || 0;
     const longestLabelText =
       data.find((d) => d.label.length === longestLabel)?.label || '';
 
    
    

    // Measure the pixel size of the longest label
    const textSize = this.textMeasurementService.measureText(
      longestLabelText,
      '14px',
      'Verdana',
      45
    );

    console.log('Longest Label:', longestLabelText);
    console.log('Measured Text Size:', textSize);
    
    

    this.host = d3.select(element.nativeElement);
    this.host.html('');

    const container = this.host.node()?.parentElement;
    if (!container) {
      console.error('Container element not found.');
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    
    this.svg = this.host.append('svg')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', `-45 ${textSize.height} ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(0,${textSize.height})');

    
    const x = d3.scaleBand().range([0, width-45]).padding(0.2);
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

    d3.select('body').append('div')

    this.svg.selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px') // Yazı boyutu
      .style('fill', 'gray') // Yazı rengi
      .on('mouseover', function (event, d) {
        // Tooltip görünür yap ve içeriğini doldur
        // tooltip
        //   .style('opacity', 1)
        //   .html(`Label: ${d}`)
        //   .style('left', `${event.pageX + 10}px`) // Tooltip konumu
        //   .style('top', `${event.pageY}px`);
      })
      .on('mousemove', function (event) {
        // Tooltip pozisyonunu hareket ettir
        // tooltip
        //   .style('left', `${event.pageX + 10}px`)
        //   .style('top', `${event.pageY}px`);
      })
      .on('mouseout', function () {
        // Tooltip'i gizle
       // tooltip.style('opacity', 0);
      });
  }
}
