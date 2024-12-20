import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientService } from '../../../../services/http-client.service';

@Component({
  selector: 'app-male',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="mb-8">
      <span>{{male}} </span>
      <mat-icon>check_circle</mat-icon>
    </div>
    <div>
      <span class="text-green">+0</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class MaleComponent implements OnInit{

  male = 0;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService.get<MaleResourcesResponse>({
      controller: "totalResourcesByGender"
    }).subscribe(data => {
      // API'den gelen yanıtın `total_resources` kısmına erişiyoruz
      this.male = data.total_resources_by_gender["0"];

    });
  }

}

interface MaleResourcesResponse {
  total_resources_by_gender: {
    [key: string]: number; // Dinamik anahtarlar, örn. "0", "1" gibi
  };
}
