import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { wrapGrid } from 'animate-css-grid';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatMenuModule],
  template: `
       <button mat-raised-button [mat-menu-trigger-for]="widgetMenu">
         <mat-icon>add_circle</mat-icon>
         Add widget
       </button>
       <mat-menu #widgetMenu="matMenu">
       @for (widget of store.widgetsToAdd(); track widget.id) {
         <button mat-menu-item (click)="store.addWidget(widget)">{{widget.label}}</button>
       }@empty{
        <button mat-menu-item>No widgets to add</button>

       }
       </mat-menu>
    
  `,
  styles: `
  
  `
})
export class DashboardHeaderComponent {
  store = inject(DashboardService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  // ngOnInit(){
  //   wrapGrid(this.dashboard().nativeElement, {
  //     duration: 300
  //   });
  // }
}
