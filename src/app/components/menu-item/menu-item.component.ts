import { Component, input, Input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  template: `
          <a 
          mat-list-item 
          class="menu-item" 
          [routerLink]="item().route" 
          routerLinkActive="selected-menu-item" 
          #rla="routerLinkActive" 
          [activated]="rla.isActive">
          <mat-icon matListItemIcon>{{item().icon}}</mat-icon>
          @if(!collapsed()){
            <span matListItemTitle>{{item().label}}</span>
          }
        </a>
  `,
  styles: [`
    
    @use '@angular/material' as mat;

    :host *{
      transition: all 500ms ease-in-out;
    }
    
  
    
    
    `]
})
export class MenuItemComponent {
  item = input.required<MenuItem>();

  collapsed = input(false);
}
