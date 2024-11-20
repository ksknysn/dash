import { Component, computed, effect, HostBinding, model, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { html } from 'd3';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatButtonModule],
  template: `

    <mat-toolbar class="mat-elevation-z3">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
      <mat-icon>menu</mat-icon>
    </button>
    <button mat-icon-button (click)="toggleTheme('blue')">
      Blue
      <mat-icon>radio_button_unchecked</mat-icon>
    </button>
    <button mat-icon-button (click)="toggleTheme('green')">
      Green
      <mat-icon>radio_button_unchecked</mat-icon>
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
  
  /**
   *
   */
  constructor(private renderer: Renderer2) {
    
    //this.renderer.addClass(document.body, "redtheme");
  }
  

  // Aktif tema sinyali
  activeTheme = signal<string | null>(null);


  toggleTheme(theme: string){
    const currentTheme = this.activeTheme();
    const body = document.body;

    // Eski temayı kaldır
    if (currentTheme) {
      this.renderer.removeClass(body, currentTheme);
    }

    // Yeni temayı uygula (aynı temayı tekrar seçerse kaldırır)
    if (currentTheme !== theme) {
      if(this.darkMode())
      {
        this.renderer.addClass(body, theme+'dark');
        this.activeTheme.set(theme+'dark');
      }
      else{
        this.renderer.addClass(body, theme+'light');
        this.activeTheme.set(theme+'light');
      }
    } else {
      this.activeTheme.set(null);
    }

  }




  collapsed = model.required<boolean>();

  
  blueTheme = signal(false);
  setBlueTheme = effect(() => {
    document.documentElement.classList.toggle('bluelight', this.blueTheme());
  })
  
  greenTheme = signal(false);
  setGreenTheme = effect(() => {
    document.documentElement.classList.toggle('greenlight', this.greenTheme());
  })

  darkMode = signal(false);
  setDarkMode = effect(()  => {
    document.documentElement.classList.toggle('bluedark', this.darkMode());
  })
}
