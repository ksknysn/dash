import { Component, effect, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatButtonModule],
  template: `
      <mat-toolbar class="mat-elevation-z3">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
      <mat-icon>menu</mat-icon>
    </button>
    <button mat-icon-button (click)="darkMode.set(!darkMode())">
      @if(darkMode()){
        <mat-icon>light_mode</mat-icon>
      } @else{
        <mat-icon>dark_mode</mat-icon>
      }

    </button>
  </mat-toolbar>
  `,
  styles: `
    mat-toolbar{
      position: relative;
      z-index: 5;
      justify-content: space-between;
      --mat-toolbar-container-background-color: var(--sys-surface-container-low);
    }
  `
})
export class HeaderComponent {
  collapsed = model.required<boolean>();

  darkMode = signal(false);

  setDarkMode = effect(()  => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  })
}
