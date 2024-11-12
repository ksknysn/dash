import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [MatIcon],
  template: `
    <div>
      <span>25,020 </span>
      <mat-icon>check_circle</mat-icon>
    </div>
    <br>
    <div>
      <span class="color-primary">+502</span> in the last 28 days
    </div>


  `,
  styles: ``
})
export class SubscribersComponent {

}
