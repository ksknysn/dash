import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private activeTheme = signal<string | null>(null);
  private darkMode = signal(false);

  // Tema değişimini yönetir
  toggleTheme(theme: string, renderer: any): void {
    const currentTheme = this.activeTheme();
    const body = document.body;

    // Eski temayı kaldır
    if (currentTheme) {
      renderer.removeClass(body, currentTheme);
      renderer.removeClass(body, currentTheme + 'light');
      renderer.removeClass(body, currentTheme + 'dark');
    }

    // Yeni temayı uygula
    if (currentTheme !== theme) {
      if (this.darkMode()) {
        renderer.addClass(body, theme + 'dark');
      } else {
        renderer.addClass(body, theme + 'light');
      }
      this.activeTheme.set(theme);
    } else {
      this.activeTheme.set(null);
    }
  }

  // Karanlık modu aç/kapat
  toggleDarkMode(renderer: any): void {
    this.darkMode.set(!this.darkMode());
    const currentTheme = this.activeTheme();
    const body = document.body;

    if (currentTheme) {
      renderer.removeClass(body, currentTheme + 'light');
      renderer.removeClass(body, currentTheme + 'dark');
      
      if (this.darkMode()) {
        renderer.addClass(body, currentTheme + 'dark');
      } else {
        renderer.addClass(body, currentTheme + 'light');
      }
    }
  }

  // Dark mode durumunu kontrol et
  get isDarkMode(): boolean {
    return this.darkMode();
  }
}
