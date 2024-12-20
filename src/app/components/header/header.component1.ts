import { AfterViewInit, Component, computed, effect, HostBinding, model, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatButtonModule],
  template: `

    <mat-toolbar class="mat-elevation-z3">
    <button mat-icon-button (click)="collapsed.set(!collapsed())">
      <mat-icon>menu</mat-icon>
    </button>


    <span class="spacer"></span> <!-- Aradaki boşluğu sağlamak için -->

    <!-- Green Theme Button -->
    <!-- {{qty}} -->
    <svg class="circleBlue" height="30" width="30" (click)="toggleTheme('blue')">
        <circle cx="15" cy="15" r="10" fill="blue" />
    </svg>
    <!-- Green Theme Button -->
  <svg class="circleGreen" height="30" width="30" (click)="toggleTheme('green')">
    <circle cx="15" cy="15" r="10" fill="green" />
  </svg>
    
    <button class="mode" mat-icon-button (click)="darkMode.set(!darkMode())">
      @if(darkMode()){
        <mat-icon>dark_mode</mat-icon>
      } @else{
        <mat-icon>light_mode</mat-icon>
      }

    </button>
  </mat-toolbar>
  `,
  styles: `
    mat-toolbar{
      position: relative;
      justify-content: space-between;
      --mat-toolbar-container-background-color: var(--sys-surface-container-low);
    }

    .spacer {
      flex: 1; /* Ortadaki boşluğu genişletir */
    }


    .circleBlue,
    .circleGreen {
      cursor: pointer; /* Tıklanabilir olduğunu gösterir */
      margin-right: 0px; /* SVG butonları arasında ve sağdaki buton arasında boşluk bırakır */
    }
    
    .circleBlue:hover,
    .circleGreen:hover {
      opacity: 0.8; /* Hover efekti için */
    }
    `
})
export class HeaderComponent implements AfterViewInit {
  
  
  activeTheme = signal<string>(
    localStorage.getItem('theme') || 'green' // Convert string to boolean
  );
  darkMode = signal<boolean>(
    localStorage.getItem('darkmode') === 'true' // Convert string to boolean
  );
  
  qty = effect(() => this.activeTheme());
  
  
  /**
   *
   */
  constructor(private renderer: Renderer2) {
    //this.toggleTheme('green');
    
    effect(() => {
      this.darkMode();
      localStorage.setItem('darkmode', this.darkMode().toString() || 'true');
      
    })

    effect(() => {
      
      this.toggleTheme(this.activeTheme());
    })

    
  }
  ngAfterViewInit(): void {
    console.log("aktif:", this.activeTheme());
    this.toggleTheme(this.activeTheme());
  }
  
  
  // Aktif tema sinyali

  
  
  // //change light to dark or dark to light mode
  // changeMode(){
  //   const currentTheme = this.activeTheme();
  //   const body = document.body;
  //   this.darkMode.set(!this.darkMode());
  //   if (currentTheme) {
  //     this.renderer.removeClass(body, currentTheme);
  //     if(this.darkMode()){
  //       this.renderer.removeClass(body, currentTheme+'light');
  //       this.renderer.addClass(body, currentTheme+'dark');
  //     }
  //     else{
  //       this.renderer.removeClass(body, currentTheme+'dark');
  //       this.renderer.addClass(body, currentTheme+'light');
  //     }
  //   }
  // }



  toggleTheme(theme: string){
    const currentTheme = this.activeTheme();
    const body = document.body;
    if(currentTheme == theme){
      return;
    }
    
    // Eski temayı kaldır
    if (currentTheme) {
      this.renderer.removeClass(body, currentTheme);
      this.renderer.removeClass(body, currentTheme+'light');
      this.renderer.removeClass(body, currentTheme+'dark');
      
    }

    // Yeni temayı uygula (aynı temayı tekrar seçerse kaldırır)
    if (currentTheme !== theme) {
      if(this.darkMode())
      {
        this.renderer.addClass(body, theme+'dark');
        this.activeTheme.set(theme);
      }
      else{
        this.renderer.addClass(body, theme+'light');
        this.activeTheme.set(theme);
      }
    } 

    localStorage.setItem('theme', this.activeTheme().toString());

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

  // setDarkMode = effect(()  => {
  //   console.log("burdayım");
  //   document.documentElement.classList.toggle('bluedark', this.darkMode());
  // })

  
}
