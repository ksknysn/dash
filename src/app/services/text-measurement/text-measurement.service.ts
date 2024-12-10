import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class TextMeasurementService {
  private tempSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  constructor() {
    // Create a temporary SVG for measuring text
    this.tempSvg = d3
      .select('body')
      .append('svg')
      .attr('width', 0)
      .attr('height', 0)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('pointer-events', 'none');
  }

  /**
   * Measures the width and height of a given text with specified font size and family.
   * @param label The text to measure.
   * @param fontSize Font size (default: "12px").
   * @param fontFamily Font family (default: "Arial").
   * @returns An object containing `width` and `height` of the text.
   */
  measureText(
    label: string,
    fontSize: string = '12px',
    fontFamily: string = 'Arial',
    rotate: number = 0 // Rotation angle in degrees
  ) {
    // Append a temporary text element to measure size
    const tempText = this.tempSvg
      .append('text')
      .attr('font-size', fontSize)
      .attr('font-family', fontFamily)
      .text(label);
  
    // Get the bounding box of the text
    const bbox = tempText.node()?.getBBox();
  
    // Remove the temporary text element
    tempText.remove();
  
    if (!bbox) {
      return { width: 0, height: 0 };
    }
  
    // Calculate the rotated dimensions
    const radians = (Math.PI / 180) * rotate; // Convert degrees to radians
    const rotatedWidth =
      Math.abs(bbox.width * Math.cos(radians)) +
      Math.abs(bbox.height * Math.sin(radians));
    const rotatedHeight =
      Math.abs(bbox.width * Math.sin(radians)) +
      Math.abs(bbox.height * Math.cos(radians));
  
    return {
      width: rotatedWidth,
      height: rotatedHeight,
    };
  }
  
}
