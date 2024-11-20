import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonToggleModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatToolbarModule, 
    CustomSidenavComponent, 
    HeaderComponent
  ],
  template: `
    <app-header [(collapsed)]="collapsed"></app-header>

    <!-- Drawer Container -->
    <mat-drawer-container>
      <!-- Sidenav -->
      <mat-drawer 
        mode="side" 
        [opened]="!collapsed()" 
        [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-drawer>

      <!-- Main Content -->
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [`
    mat-drawer-container {
      position: relative;
      z-index: 5;
      min-height: 750px;
      
      
    }

    mat-drawer {
      flex-shrink: 0; /* Drawer'ın daralmamasını sağlar */
      width: 250px;
      height: calc(100vh - 64px);
      display: flex;
    }

    mat-drawer-content {
      flex: 1; /* Drawer content'in otomatik genişlemesini sağlar */
      transition: margin 500ms ease-in-out; /* Animasyon için */
      padding: 3%;
    }


  `],
})
export class AppComponent {
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
