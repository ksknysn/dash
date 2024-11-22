import { Component, inject, input, signal } from '@angular/core';

import { NgComponentOutlet, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { WidgetOptionsComponent } from "./widget-options/widget-options.component";
import { DashboardService } from '../../services/dashboard.service';
import { CdkDrag, CdkDragPlaceholder, CdkDragPreview, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { WidgetHeaderComponent } from "./widget-header/widget-header.component";
import { Widget } from '../../models/dashboard';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet, MatButtonModule, MatIconModule, WidgetOptionsComponent, 
    CdkDrag, CdkDragPlaceholder, WidgetHeaderComponent, CdkDragPreview, NgIf],
    template: `
    <div mat-card
      class="container mat-elevation-z3" 
      [style.background-color]="data().backgroundColor ?? 'var(--sys-primary-container)'"
      cdkDrag    
      cdkDragPreviewContainer="parent"
      >
      <!-- Widget Header -->
      <app-widget-header [data]="data()" [(showOptions)]="showOptions" />

      <!-- Widget Content -->
      <ng-container *ngIf="!showOptions(); else optionsContent">
        <ng-container [ngComponentOutlet]="data().content"></ng-container>
      </ng-container>

      <!-- Widget Options -->
      <ng-template #optionsContent>
        <app-widget-options [data]="data()" [(showOptions)]="showOptions" />
      </ng-template>

      @if(showOptions()){
        <app-widget-options [data]="data()" [(showOptions)]="showOptions" />
      }
      <div *cdkDragPlaceholder></div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      border-radius: 16px;
    }
    .container{
      position: relative;
      height: 100%;
      width: 100%;
      padding: 32px;
      box-sizing: border-box;
      border-radius: inherit;
      overflow: hidden;
    }
  `,
  host: {
    '[style.grid-area]': 
      '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)'

  }
})
export class WidgetComponent {
  data = input.required<Widget>();
  
  store = inject(DashboardService);

  showOptions = signal(false);
}
