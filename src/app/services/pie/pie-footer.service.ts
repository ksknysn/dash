import { Injectable } from '@angular/core';
import { TwoDimData } from '../../models/TwoDimData';

@Injectable({
  providedIn: 'root'
})
export class PieFooterService {

  constructor() { }

  createPieChart(
    data: TwoDimData[]
  ): void{
    console.log(data);
  }
}
