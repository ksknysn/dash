import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { TwoDimData } from '../../models/TwoDimData';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class PieCleanChartService {

  @ViewChild('containerPieChart', { static: false }) element!: ElementRef;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;
  
  createChart(
    element: ElementRef,
    data: TwoDimData[],
    onBarClick: (data: TwoDimData) => void  
  ): void{

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
    
    const pie = d3.pie<TwoDimData>().sort(null).value(d => d.value);
    var arc = d3.arc<d3.PieArcDatum<any>>()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);
    
    // var color = d3.scaleOrdinal()
    //   .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
    //   .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);


    var outerArc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const arcs = this.svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

      arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(String(i)))
      .on('click', (event, d) => alert(`Dilime tıklandı: ${d.data.label}, Değer: ${d.data.value}`))
      
      
      arcs.append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', (d) => {
          const posA = arc.centroid(d); // Dilim merkezi
          const posB = outerArc.centroid(d); // Çizginin dış kısmı
          const posC = [...outerArc.centroid(d)]; // Etiket pozisyonu
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2; // Orta açı
          posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1); // Sağda mı solda mı kontrolü
          // Koordinatları string formatına dönüştür
          return [posA, posB, posC].map(point => point.join(',')).join(' ');
        })
        
        this.svg
        .selectAll('allLabels')
        .data(pie(data)) // Veri: pie tarafından üretilmiş
        .enter()
        .append('text')
        .text((d) => d.data.label) // d.data.label kullanarak etiketi ekliyoruz
        .attr('transform', (d) => {
          const pos = outerArc.centroid(d); // Etiketin pozisyonu
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2; // Orta açı
          pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1); // Sağ/Sol hizası
          return `translate(${pos[0]}, ${pos[1]})`;
        })
        .style('text-anchor', (d) => {
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2; // Orta açı
          return midAngle < Math.PI ? 'start' : 'end'; // Metin hizalaması
        })
        .style('font-size', '12px') // Yazı boyutunu ayarlayabilirsiniz
        .style('fill', '#333'); // Yazı rengini ayarlayabilirsiniz
      


  }
}
