import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import { PieData } from '../../../services/pie/pie-data';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [],
  template: `
    <div class="chart-container">
      <div #containerPieChart></div>
    </div>
  `,
  styles: `
    .chart-container {
      width: 100%;
      height: 100%;
    }
    #containerPieChart{
      position: absolute;
    }
    
    `
})
export class PersonelDepartmentsComponent implements AfterViewInit {

  @ViewChild('containerPieChart', { static: true }) element!: ElementRef;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  // private container = this.host.node()?.parentElement;
  private radius!: number;
  // private widthPie = 300;
  // private heightPie = 300;
  // private radius = Math.min(this.widthPie, this.heightPie) / 2;

  // data = [{label: '1', value: 30},{label: '2', value: 50},{label: '3', value: 40}]


  
  data: PieData[] = [
    { label: 'IT', value: 30 },
    { label: 'HR', value: 50 },
    { label: 'Sales', value: 40 },
    { label: 'Production', value: 70 },
    { label: 'Purchasing', value: 50 }
  ];

  constructor(){}

  public tikla(data: PieData): void {
    alert(`Dilime tıklandı: ${data.label}, Değer: ${data.value}`);
  }

  ngAfterViewInit(): void {
  //  const container = this.host.node()?.parentElement;

    this.setup();
    this.buildSVG();
    this.buildPie();
  }

  

  private setup(): void{
    this.host = d3.select(this.element.nativeElement);
    this.host.html(''); // Clear previous pie chart content
  }



  private buildSVG(): void{
    // Select the container element (the parent element of the SVG)
    const container = this.host.node()?.parentElement;

    if (!container) {
      return; // Exit early if the container is not found
    }

    // Get the width and height of the parent container dynamically
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    console.log("normal:",width, height);

  
    // console.log("Container dimensions:", { width: container.clientWidth, height: container.clientHeight });

    this.svg = this.host.append('svg')
      // .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(' + width/2 +  ',' + height/2 +')');

  }

  private buildPie(): void{
    const container = this.host.node()?.parentElement;

    if (!container) {
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight - container.clientHeight * 0.2;
    
    let radius = Math.min(width, height) / 2;

    // if(height<width){
    //   radius = height/5;
    // }
    const pie = d3.pie<PieData>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius);
      // .outerRadius(50)

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    const arcs = this.svg.selectAll('.arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(String(i)))
      .on('click', (event, d) => this.tikla(d.data)); // Tıklama olayını bağlama

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.label);


  


  }

}
