import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import { BarData } from '../../../../services/bar-data';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MatButton],
  template: `
  <!-- Add 2 buttons -->
    <button mat-stroked-button (click)="loadData('var1')">Variable 1</button>
    <button mat-stroked-button (click)="loadData('var2')">Variable 2</button>
    <div class="chart-container">
      <div #containerPieChart></div>
    </div>
  `,
  styles: `
  .chart-container {
      width: 100%;
      height: calc(100% - 70px);
      top: 10px;
      bottom: 350px;
    }
    `
})
export class BarComponent implements AfterViewInit {



  @ViewChild('containerPieChart', { static: true }) element!: ElementRef;
  private host!: d3.Selection<HTMLElement, unknown, null, undefined>;
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private chartData: BarData[] = []; 
  
  async ngOnInit(){
    await this.loadData('var1');
  }

  async loadData(selectedVar: string){
        // Load the CSV data and assign it to chartData
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv")
        .then((data) => {
          // Map the data to match the BarData interface
          this.chartData = data.map(d => ({
            group: d['group'],
            value: +d[selectedVar] // Convert the value to a number
          }))
          this.setup();
          this.buildSVG();
          this.buildBar(selectedVar);
          ;
  
          console.log(this.chartData); // Log the chart data
        })
        .catch((error) => {
          console.error("Error loading CSV data:", error);
        });
  }

  ngAfterViewInit(){
    // console.log(this.chartData);
    // this.setup();
    // this.buildSVG();
    // this.buildBar('var1');
  }

  private setup(): void{
    this.host = d3.select(this.element.nativeElement);
    this.host.html(''); // Clear previous pie chart content
  }

  
  private buildSVG(): void{
    // Select the container element (the parent element of the SVG)
    const container = this.host.node()?.parentElement;

    if (!container) {
      console.error("Container element not found.");
      return; // Exit early if the container is not found
    }

    // Get the width and height of the parent container dynamically
    const width = container.clientWidth;
    const height = container.clientHeight - container.clientHeight * 0.2;

    this.svg = this.host.append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append('g')
      //.attr('transform', 'translate(' + width +  ',' + height +')');
  }

  

  buildBar(v: string): void{
    
    const container = this.host.node()?.parentElement;

    if (!container) {
      console.error("Container element not found.");
      return;
    }
    const width = container.clientWidth;
    const height = container.clientHeight - container.clientHeight * 0.2;
    console.log(width, height);
    // Initialize the X axis
    const x = d3.scaleBand()
      .range([ 0, width ])
      .padding(0.2);

    // Initialize the Y axis
    const y = d3.scaleLinear()
       .range([ height, 0]);
        // const yAxis = this.svg.append("g")
        // .attr("class", "myYaxis");

        // Create the SVG and append the axis groups
    const xAxis = this.svg.append("g")
    .attr("transform", `translate(0,${height})`);
    // .attr("transform", `translate(0,0)`);

    const yAxis = this.svg.append("g")
    .attr("class", "y");


    x.domain(this.chartData.map(d => d.group));
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    // Add Y axis
    const maxY = d3.max(this.chartData, d => d.value) || 0;
    console.log(this.chartData);
    console.log("maxy", maxY);
    y.domain([0, maxY]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    const u = this.svg.selectAll("rect")
      .data(this.chartData)


      // update bars
    u.join("rect")
    .transition()
    .duration(1000)
      .attr("x", d => {
        const xValue = x(d.group);
        return xValue !== undefined ? xValue : 0; // Provide a fallback value if undefined
      })
      
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", "#69b3a2")
  }

}
