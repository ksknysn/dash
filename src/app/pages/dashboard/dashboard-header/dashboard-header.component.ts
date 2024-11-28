import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { wrapGrid } from 'animate-css-grid';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SettingsIconService } from '../../../services/settings-icon/settings-icon.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatMenuModule],
  template: `
       <button mat-raised-button [mat-menu-trigger-for]="widgetMenu" style="color: var(--sys-primary)" >
         <mat-icon>add_circle</mat-icon>
         Add widget
       </button>
       @if (editable.sharedSignal()) {
        <mat-icon class="right" (click)="editable.sharedSignal.set(false)">
           <span class="material-symbols-outlined">
           visibility
           </span>
         </mat-icon>
        }
        @else {
         <mat-icon class="right" (click)="editable.sharedSignal.set(true)">
            <span class="material-symbols-outlined">
            edit
            </span>
          </mat-icon>
       }
       
       <mat-menu #widgetMenu="matMenu">
       @for (widget of store.widgetsToAdd(); track widget.id) {
         <button mat-menu-item style="z-index: 5; background-color: var(--sys-on-surface); color: var(--sys-surface-variant);" (click)="store.addWidget(widget)">{{widget.label}}</button>
       }@empty{
        <button mat-menu-item style="z-index: 5; background-color: var(--sys-on-surface); color: var(--sys-surface-variant);">No widgets to add</button>

       }
       </mat-menu>
    
  `,
  styles: `
  .right{
    float: right;
    padding-right: 8px;
  }
  
  `
})
export class DashboardHeaderComponent {
  constructor(public editable: SettingsIconService) {}

  store = inject(DashboardService);

  
  dashboard = viewChild.required<ElementRef>('dashboard');

}
