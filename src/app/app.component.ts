import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatToolbarModule, CustomSidenavComponent, HeaderComponent],
  template: `
  <app-header [(collapsed)]="collapsed"/>
  
  <mat-sidenav-container>
    <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
      <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
    </mat-sidenav>
    <mat-sidenav-content class="content">
    <router-outlet />
    </mat-sidenav-content>
  </mat-sidenav-container>

    
    
  `,
  styles: [`
  mat-toolbar{
    position: relative;
    z-index: 5;
  }
  .content{
    padding:24px;
  }
  mat-sidenav-container{
    height: calc(100vh - 64px);
  }
  mat-sidenav,mat-sidenav-content{
    transition: all 500ms ease-in-out;
  }

  
  
  `
    
  ],
})
export class AppComponent {
  title = 'zoa';
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px':'250px');
}
