import { Routes } from '@angular/router';
import { SmartphoneDashboardComponent } from './smartphone-dashboard/smartphone-dashboard.component';
import { SmartphoneDetailComponent } from './smartphone/detail/detail.component';
export const routes: Routes = [
  { path: '', redirectTo: '/smartphones', pathMatch: 'full' },
  { path: 'smartphones', component: SmartphoneDashboardComponent },
  { path: 'smartphones/:id', component: SmartphoneDetailComponent },
  { path: '**', redirectTo: '/smartphones' }, // Route par défaut
];
