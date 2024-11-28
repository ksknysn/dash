import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsIconService {

  // Define the signal in the service
  sharedSignal = signal(false);

  // Method to update the signal
  updateSignal(newValue: boolean) {
    this.sharedSignal.set(newValue);
  }
}
