import { Component, Input, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, RouterModule, MenuItemComponent],
  template: `
    <div class="sidenav-header">
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Dashboard</h2>
      </div>
    </div>
    <mat-nav-list>
      @for (item of menuItems(); track item.label) {
        <app-menu-item [item]="item" [collapsed]="sideNavCollapsed()"></app-menu-item>
      }
    </mat-nav-list>
  `,
  styles: [`
    :host *{
      transition: all 500ms ease-in-out;
    }
    .sidenav-header{
      padding-top: 24px;
      text-align: center;
    }
    .hide-header-text{
      opacity: 0;
    }
    .menu-item{
      // border-left: 5px solid;
      // border-left-color: rgba(0,0,0,0);
    }
    .selected-menu-item{
      color: blue;
      
    }
    `]
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },{
      icon: 'video_library',
      label: 'Content',
      route: 'content'
    }
  ]);
}
