import { Component, inject, input, model, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Widget } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-widget-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  template: `
     <div 
        class="header" 
        [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
      >
        <h3 class="m-0">{{ data().label}}</h3>
        <button mat-icon-button (click)="showOptions.set(true)">
          <mat-icon [style.color]="'var(--sys-secondary)'">settings</mat-icon>
        </button>
      </div>
  `,
  styles: `
  
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
    cursor: move;

    > button {
      position: absolute;
      top: 20px;
      right: 10px;
    }
  }
    `
})
export class WidgetHeaderComponent {
  data = input.required<Widget>();
  
  showOptions = model.required<boolean>();
}
