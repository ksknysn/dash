import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HttpClientService } from '../../../../services/http-client.service';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [MatIcon],
  template: `
    <div class="mb-8">
      <span>{{female}} </span>
      <mat-icon>check_circle</mat-icon>
    </div>
    <div>
      <span class="color-primary">+0</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class FemalesComponent {

  female = 0;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService.get<FemaleResourcesResponse>({
      controller: "totalResourcesByGender"
    }).subscribe(data => {
      // API'den gelen yanıtın `total_resources` kısmına erişiyoruz
      this.female = data.total_resources_by_gender["1"];
    });
  }
}

interface FemaleResourcesResponse {
  total_resources_by_gender: {
    [key: string]: number; // Dinamik anahtarlar, örn. "0", "1" gibi
  };
}
