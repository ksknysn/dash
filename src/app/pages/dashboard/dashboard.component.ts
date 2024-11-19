import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { WidgetComponent } from "../../components/widget/widget.component";
import { DashboardService } from '../../services/dashboard.service';
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, DashboardHeaderComponent, CdkDropList, CdkDropListGroup],
  providers:[DashboardService],
  template: `
    <app-dashboard-header />
    <div #dashboard class="dashboard-widgets" cdkDropListGroup>
      @for (w of store.addedWidgets(); track w.id) {
        <app-widget cdkDropList [data]="w" (cdkDropListDropped)="drop($event)" [cdkDropListData]="w.id"/>
      }
    </div>
  `,
  styles: `
  .dashboard-widgets{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 150px;
    
    gap: 16px;
    max-height: 100%; /*taşmayı engelle*/
    overflow: hidden; /* scroll bar'ı gizle */
  }
  
  `
})
export class DashboardComponent {

  store = inject(DashboardService);


  drop(event: CdkDragDrop<number, any>){
    
    const {previousContainer, container} = event;
    this.store.updateWidgetPosition(previousContainer.data, container.data);
    
  }

}
