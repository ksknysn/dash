import { Component, inject, input, model, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Widget } from '../../../models/dashboard';
import { MatButtonModule } from '@angular/material/button';
import { SettingsIconService } from '../../../services/settings-icon/settings-icon.service';

@Component({
  selector: 'app-widget-header',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  template: `
     <div 
        class="header" 
        [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
      >
        <h3 class="m-0">{{ data().label}}</h3>
        @if (editable.sharedSignal()) {
          <button mat-icon-button (click)="showOptions.set(true)">
            <mat-icon>settings</mat-icon>
          </button>
        }
      </div>
  `,
  styles: `
  
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
    cursor: move;

    > button {
      position: absolute;
      top: 20px;
      right: 10px;
    }
  }
    `
})
export class WidgetHeaderComponent {
  /**
   *
   */
  constructor(public editable: SettingsIconService) {
    
  }

  data = input.required<Widget>();
  
  showOptions = model.required<boolean>();
}
