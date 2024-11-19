import { Component, effect, HostBinding, model, Renderer2, signal } from '@angular/core';
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
    <button mat-icon-button (click)="changeTheme('accent')">red theme</button>
    <button mat-icon-button (click)="changeTheme2()">violet theme</button>

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
      /* --mat-toolbar-container-background-color: var(--clr-primary-10);*/
    }
  `
})
export class HeaderComponent {
  
  /**
   *
   */
  constructor(private renderer: Renderer2, private overlayContainer: OverlayContainer) {
    
    //this.renderer.addClass(document.body, "redtheme");
  }
  currentTheme: ThemePalette = 'primary';
  changeTheme2(){
    
    document.documentElement.classList.remove('red');
    let allDivs = document.querySelectorAll('app-widget');

      // Remove a class from all divs
      allDivs.forEach(div => {
        div.classList.remove('containerRed');
      });

      // Add a class to all divs
      allDivs.forEach(div => {
        div.classList.add('containerViolet');
      });

    document.documentElement.classList.add('violet');
  }

  changeTheme(newTheme: ThemePalette){
    // document.setProperty('--user-color', "#acacea");
    // console.log(document.documentElement.classList);
    // document.documentElement.classList.add('lighttheme');
    console.log(this.renderer);
    //this.renderer.removeClass(document.body, "mat-typography");
    //this.renderer.addClass(document.body, "redtheme");
    this.currentTheme = newTheme;
    document.documentElement.classList.remove('violet');
    let allDivs = document.querySelectorAll('app-widget');
    // Remove a class from all divs
    allDivs.forEach(div => {
      div.classList.remove('containerViolet');
    });

    // Add a class to all divs
    allDivs.forEach(div => {
      div.classList.add('containerRed');
    });


    document.documentElement.classList.add('red');
    document
    console.log(html);
  }
  collapsed = model.required<boolean>();

  darkMode = signal(false);

  setDarkMode = effect(()  => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  })
}
