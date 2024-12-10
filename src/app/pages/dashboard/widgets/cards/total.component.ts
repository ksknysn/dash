import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientService } from '../../../../services/http-client.service';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="mb-8">
      <span>{{totalResource}}</span>
      <mat-icon>check_circle</mat-icon>
    </div>
    <div>
      <span class="text-green">+0</span> in the last 28 days
    </div>
  `,
  styles: ``
})
export class TotalComponent implements OnInit {

  totalResource = 0;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService.get<TotalResourcesResponse>({
      controller: "totalNumberOfResources"
    }).subscribe(data => {
      // API'den gelen yanıtın `total_resources` kısmına erişiyoruz
      this.totalResource = data.total_resources;
    });
  }
}

interface TotalResourcesResponse {
  total_resources: number;
}
