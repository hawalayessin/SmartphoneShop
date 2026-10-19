// In app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmartphoneDashboardComponent } from './smartphone-dashboard/smartphone-dashboard.component';
import { SmartphoneDetailComponent } from './smartphone/detail/detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SmartphoneDashboardComponent,SmartphoneDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SmartphoneShop';
}

// In app.component.html
