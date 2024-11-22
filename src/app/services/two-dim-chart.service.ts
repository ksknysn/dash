import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TwoDimData } from '../models/TwoDimData';

@Injectable({
  providedIn: 'root'
})
export class TwoDimChartService {

  private dataSubject = new BehaviorSubject<TwoDimData[]>([]);


  constructor() { 
    // Başlangıç verisi eklenebilir.
    this.setData([
      { label: 'Category 1', value: 40 },
      { label: 'Category 2', value: 60 },
    ]);
  }

  getData(): Observable<TwoDimData[]> {
    return this.dataSubject.asObservable();
  }

  setData(newData: TwoDimData[]): void {
    this.dataSubject.next(newData);
  }

  addData(newEntry: TwoDimData): void {
    const currentData = this.dataSubject.getValue();
    this.dataSubject.next([...currentData, newEntry]);
  }
}
