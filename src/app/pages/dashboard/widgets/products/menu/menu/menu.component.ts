import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-button (click)="sex.set('var1')">Male</button>
    <button mat-button (click)="sex.set('var2')">Female</button>
  `,
  styles: `
  .material-icons {
    font-size: 8px;
  }
  `
})
export class MenuComponent {
  sex = model<string>();
}
